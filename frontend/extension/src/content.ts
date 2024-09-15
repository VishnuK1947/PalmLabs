// import { api } from "../../convex/_generated/api"

// Initialize Convex client
//const convex = new ConvexHttpClient('https://zealous-porpoise-554.convex.cloud');
//convex.setAuth()

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

    private runProgram(selection: { toString: () => any; }): void {
        // Replace with your desired action
        console.log('Running program');
        console.log('Selected text:', selection.toString());
        //convex.mutation("messages:send" as any, { body: selection.toString() });
        // For example, you could navigate to your website:
        // window.location.href = 'https://your-website.com';
        //this.handleSelection();
        this.removePopup();
    }

    public handleSelection(): void {
        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 5) {
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