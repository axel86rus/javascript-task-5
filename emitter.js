'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = false;
module.exports = getEmitter;

const TYPE = {
    several: 1,
    through: 2
};


/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let eventObject = new Map();
    function addEvent(event, context, handler, obj) {
        if (eventObject.get(context) === undefined) {
            eventObject.set(context,
                obj);
        } else if (eventObject.get(context)[event] === undefined) {
            eventObject.set(context,
                Object.assign(eventObject.get(context),
                    (obj[event].type !== undefined)
                        ? obj[event]
                        : obj));
        } else {
            eventObject.get(context).event.push(
                (obj[event].type !== undefined)
                    ? obj[event]
                    : handler);
        }
    }
    function runFunc(context, events, eventes, index) {
        let func = events[eventes][index];
        if (typeof func === 'function') {
            func.bind(context)();
        } else {
            runFuncFromObj(context, events, eventes, index);
        }
    }
    function runFuncFromObj(context, events, eventes, index) {
        let obj = events[eventes][index];
        console.info('obj', obj);
        console.info('events', events);
        console.info('eventes', eventes);
        console.info('context', context);
        switch (obj.type) {
            case TYPE.several:
                obj.count += 1;
                if (obj.count <= obj.time) {
                    obj.func.bind(context)();
                }
                break;
            case TYPE.through:
                obj.count += 1;
                if (obj.count === obj.time) {
                    obj.func.bind(context)();
                    obj.count = 0;
                }
                break;
            default:
                break;
        }
        console.info(context);
    }


    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            let obj = {};
            obj[event] = [handler];
            addEvent(event, context, handler, obj);

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            Object.keys(eventObject.get(context))
                .filter((value) => value === event || value.split('.')[0] === event)
                .forEach((key) => {
                    eventObject.get(context)[key] = [];
                });

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            eventObject.forEach((events, context) => {
                let eventNamespace = event.split('.');
                for (let index = 0; index < eventNamespace.length; index++) {
                    let eventes = eventNamespace.slice(0, eventNamespace.length - index).join('.');
                    if (events[eventes] !== undefined) {
                        events[eventes].forEach((_, number) => {
                            runFunc(context, events, eventes, number);
                        }
                        );
                    }
                }
            });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object}
         */
        several: function (event, context, handler, times) {
            if (times <= 0) {
                this.on(event, context, handler);
            } else {
                let obj = {};
                let addArr = {};
                obj[event] = [];
                addArr.type = TYPE.several;
                addArr.func = handler;
                addArr.count = 0;
                addArr.time = times;
                obj[event].push(addArr);
                addEvent(event, context, handler, obj);
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         * @returns {Object}
         */
        through: function (event, context, handler, frequency) {
            if (frequency <= 0) {
                this.on(event, context, handler);
            } else {
                let obj = {};
                let addArr = {};
                obj[event] = [];
                addArr.type = TYPE.through;
                addArr.func = handler;
                addArr.count = 0;
                addArr.time = frequency;
                obj[event].push(addArr);
                addEvent(event, context, handler, obj);
            }

            return this;
        }
    };
}
