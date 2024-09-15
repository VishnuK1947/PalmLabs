interface PopupStyles {
    [key: string]: string;
}

class SelectionPopup {
    private popup: HTMLDivElement | null = null;

    private createPopup(selection: Selection): void {
        this.popup = document.createElement('div');
        const popupStyles: PopupStyles = {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            zIndex: '9999',
            fontSize: '14px'
        };

        Object.assign(this.popup.style, popupStyles);
        this.popup.textContent = 'Text selected! Run program?';

        const button = document.createElement('button');
        button.textContent = 'Run';
        button.style.marginLeft = '10px';
        button.addEventListener('click', this.runProgram.bind(this, selection));

        this.popup.appendChild(button);
        document.body.appendChild(this.popup);
    }

    private removePopup(): void {
        if (this.popup && document.body.contains(this.popup)) {
            document.body.removeChild(this.popup);
        }
        this.popup = null;
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
                body: JSON.stringify({username: "john.smith@usc.edu", selected_text : selectedText, hard_letters: []}), // Adjust the payload as needed
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