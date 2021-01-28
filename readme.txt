REQUISITI

Integrazione custom Alexa Media Player


INSTALLAZIONE

Copiare il file countdown-card.js in /config/www
Abilitare la risorsa da interfaccia Home Assistant:  Impostazioni -> Plance di Lovelace -> Risorse -> Aggiungi Risorsa

URL: /local/countdown-card.js


CARD LOVELACE

La card è molto spartana e mostra solo lo stato del sensore dichiarato nel parametro entity.

Card base:

****************************************************
type: 'custom:countdown-card'
entity: sensor.echo_studio_next_timer
****************************************************

Con opzioni:

****************************************************
type: 'custom:countdown-card'
entity: sensor.echo_studio_next_timer
label_off: Spento
label_completed: Completato
style: |
  .countdown-body {
    font-size: 24px;
    margin: 0px;
    text-align: center;
  }
****************************************************

Per usare style occorre card-mod e con la classe countdown-body è possibile modificare il css del testo a piacere.

POPUP AUTOMATICO

Un esempio di due automazioni per gestire un popup automatico su un device con l’utilizzo dell’integrazione custom browser_mod.

- alias: Start Timer Sala
  trigger:
    platform: state
    entity_id: sensor.echo_sala_next_timer
    from: 'unavailable'
  action:
  - service: browser_mod.popup
    data:
      title: TIMER
      auto_close: false
      style:
        $: |
          .mdc-dialog .mdc-dialog__container .mdc-dialog__surface {
            border-radius: 25px;
          }
          .mdc-dialog .mdc-dialog__content {
              padding: 40px 48px !important;
          }    
      deviceID:
        - browser-tablet
      card:
        type: 'custom:countdown-card'
        entity: sensor.echo_sala_next_timer
        label_off: Spento
        label_completed: Completato
        style: |
          ha-card {
            background: none!important;
            box-shadow: none;
            border-radius: 0px;
          }        
          .countdown-body {
            font-size: 48px;
            text-align: center;
          }  
          
- alias: Stop Timer Sala
  trigger:
    platform: state
    entity_id: sensor.echo_sala_next_timer
    to: 'unavailable'
  action:
  - service: browser_mod.close_popup


Crediti

La card originale è questa:
https://gist.github.com/Mikulas/a02d3c2032fceb793639c03799f296d6

Io ho solo aggiunto i parametri facoltativi e rivisto piccole cose.
Spero sia utile ;)

Massimiliano Albani

 