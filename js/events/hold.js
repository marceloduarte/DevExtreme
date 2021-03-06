import { eventData, eventDelta } from './utils';
import Emitter from './core/emitter';
import registerEmitter from './core/emitter_registrator';
const abs = Math.abs;

const HOLD_EVENT_NAME = 'dxhold';
const HOLD_TIMEOUT = 750;
const TOUCH_BOUNDARY = 5;


const HoldEmitter = Emitter.inherit({

    start: function(e) {
        this._startEventData = eventData(e);

        this._startTimer(e);
    },

    _startTimer: function(e) {
        const holdTimeout = ('timeout' in this) ? this.timeout : HOLD_TIMEOUT;
        this._holdTimer = setTimeout((function() {
            this._requestAccept(e);
            this._fireEvent(HOLD_EVENT_NAME, e, {
                target: e.target
            });
            this._forgetAccept();
        }).bind(this), holdTimeout);
    },

    move: function(e) {
        if(this._touchWasMoved(e)) {
            this._cancel(e);
        }
    },

    _touchWasMoved: function(e) {
        const delta = eventDelta(this._startEventData, eventData(e));

        return abs(delta.x) > TOUCH_BOUNDARY || abs(delta.y) > TOUCH_BOUNDARY;
    },

    end: function() {
        this._stopTimer();
    },

    _stopTimer: function() {
        clearTimeout(this._holdTimer);
    },

    cancel: function() {
        this._stopTimer();
    },

    dispose: function() {
        this._stopTimer();
    }

});

/**
  * @name UI Events.dxhold
  * @type eventType
  * @type_function_param1 event:event
  * @module events/hold
*/

registerEmitter({
    emitter: HoldEmitter,
    bubble: true,
    events: [
        HOLD_EVENT_NAME
    ]
});

export default {
    name: HOLD_EVENT_NAME
};
