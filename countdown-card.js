class CountdownCard extends HTMLElement {
    set hass(hass) {
        if (!this.content) {
            const card = document.createElement('ha-card');
            this.content = document.createElement('div');
            this.content.style.padding = '16px 16px';
            card.appendChild(this.content);
            this.appendChild(card);
        }

        const entityId = this.config.entity;

        const label_off = this.config.label_off;
        this.label_off = label_off ? label_off : 'Nessun Timer';

        const label_completed = this.config.label_completed;
        this.label_completed = label_completed ? label_completed : 'Completato';
        
        const state = hass.states[entityId];
        this.stateStr = state ? state.state : 'unavailable';

        if (state) {
            this.rAF_ID = requestAnimationFrame(this.render.bind(this));
        }
    }

    render(callback) {
        if (this.stateStr === 'unavailable') {
            this.content.innerHTML = `<h2 class='countdown-body'>${this.label_off}</h2>`;
            return;
        }

        const totalSeconds = (new Date(this.stateStr) - new Date()) / 1000;
        const hours = Math.floor(totalSeconds / 3600) + "";
        const minutes = Math.floor(totalSeconds / 60) % 60 + "";
        const seconds = Math.floor(totalSeconds % 60) + "";
        const relative = hours.padStart(2, '0') + ':' + minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');

        if (totalSeconds<0)
        {
          this.content.innerHTML = `<h2 class='countdown-body'>${this.label_completed}</h2>`;
        } else {
          this.content.innerHTML = `<h2 class='countdown-body'>${relative}</h2>`;
        }
        
        this.rAF_ID = requestAnimationFrame(this.render.bind(this));
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error('You need to define an entity');
        }
        this.config = config;
    }

    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
        return 2;
    }
}

customElements.define('countdown-card', CountdownCard);