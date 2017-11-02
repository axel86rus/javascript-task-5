'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = false;
module.exports = getEmitter;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let eventObject = new Map();

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
            if (eventObject.get(context) === undefined) {
                eventObject.set(context,
                    obj);
            } else if (eventObject.get(context)[event] === undefined) {
                eventObject.set(context,
                    Object.assign(eventObject.get(context), obj));
            } else {
                eventObject.get(context).event.push(handler);
            }

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
                        events[eventes].forEach((func) => {
                            func.bind(context)();
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
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}
