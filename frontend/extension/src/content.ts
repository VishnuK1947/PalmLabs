interface PopupStyles {
    [key: string]: string;
}

class SelectionPopup {
    private popup: HTMLDivElement | null = null;

    private createPopup(selection: Selection): void {
        this.popup = document.createElement('div');
        const popupStyles: PopupStyles = {
            position: 'fixed',
            top: '0px',  // Start from the top
            right: '20px',
            backgroundColor: '#2C7873',
            border: 'none',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            zIndex: '9999',
            fontFamily: 'Arial, sans-serif',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '300px',
            opacity: '0',  // Start fully transparent
            transform: 'translateY(-20px)',  // Start slightly above final position
            transition: 'opacity 0.3s ease, transform 0.3s ease, top 0.3s ease'  // Smooth transition for fade and slide
        };

        Object.assign(this.popup.style, popupStyles);

        const textSpan = document.createElement('span');
        textSpan.textContent = 'Ready to practice ASL?';
        textSpan.style.fontSize = '16px';
        textSpan.style.fontWeight = '600';

        const button = document.createElement('button');
        button.textContent = 'Go!';
        const buttonStyles: PopupStyles = {
            backgroundColor: 'white',
            color: '#2C7873',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginLeft: '10px'
        };
        Object.assign(button.style, buttonStyles);
        button.addEventListener('click', this.runProgram.bind(this, selection));
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#e0e0e0';
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = 'white';
            button.style.transform = 'scale(1)';
        });

        this.popup.appendChild(textSpan);
        this.popup.appendChild(button);
        document.body.appendChild(this.popup);

        // Trigger the animation after a short delay
        setTimeout(() => {
            if (this.popup) {
                this.popup.style.opacity = '1';
                this.popup.style.transform = 'translateY(0)';
                this.popup.style.top = '20px';
            }
        }, 50);
    }

    private removePopup(): void {
        if (this.popup && document.body.contains(this.popup)) {
            // Fade out animation
            this.popup.style.opacity = '0';
            this.popup.style.transform = 'translateY(-20px)';
            
            // Remove the element after the animation completes
            setTimeout(() => {
                if (this.popup && document.body.contains(this.popup)) {
                    document.body.removeChild(this.popup);
                }
                this.popup = null;
            }, 300);  // Match this with the transition duration
        }
    }

    private async runProgram(selection: Selection): Promise<void> {
        const selectedText = selection.toString();
        console.log('Selected text:', selectedText);
        if (selectedText) {
            await this.sendSelectedTextToBackend(selectedText);
        }
        this.removePopup();
    }

    private async sendSelectedTextToBackend(selectedText: string): Promise<void> {
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: "john.smith@usc.edu", selected_text : selectedText, hard_letters: []}),
            });

            if (!response.ok) {
                throw new Error('Failed to send selected text to backend');
            }

            const result = await response.json();
            console.log('Saved user:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    public handleSelection(): void {
        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 0) {
            if (!this.popup) {
                this.createPopup(selection);
            }
        } else {
            this.removePopup();
        }
    }
}

const selectionPopup = new SelectionPopup();
document.addEventListener('selectionchange', () => selectionPopup.handleSelection());