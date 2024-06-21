/*
azure-maps-autofocus-control Version: 0.0.5

(based on azure-maps-bring-data-into-view-control Version: 0.0.3)

MIT License

    Copyright (c) Microsoft Corporation.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE
*/

(function(exports, azmaps) {
    "use strict";

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = (Object.assign || function __assign(object) {
            for (var argument, a = 1, n = arguments.length; a < n; a++) {
                argument = arguments[a];
                for (var prop in argument) {
                    if (Object.prototype.hasOwnProperty.call(argument, prop)) {
                        object[prop] = argument[prop];
                    }
                }
            }

            return object;
        });

        return __assign.apply(this, arguments);
    }


    /**
     * Helper class for merging namespaces.
     */

    var Namespace = /** @class */ (function() {
        function Namespace() {}
        Namespace.merge = function(namespace, base) {
            var context = (window || global),
                parts = namespace.split(".");

            for (var p = 0, parts_1 = parts; p < parts_1.length; p++) {
                var part = parts_1[p];
                if (context[part]) {
                    context = context[part];
                } else {
                    return base;
                }
            }

            return __assign(__assign({}, context), base);
        }

        return Namespace;
    }());

    /** A control to focus any data loaded on the map (fit to viewport) */
    var AutofocusControl = /** @class */ (function() {

        /****************************
         * Constructor
         ***************************/

        /**
         * A control to focus any data loaded on the map (fit to viewport)
         * 
         * @param options Options for defining how the control is rendered and functions.
         */

        function AutofocusControl(options) {
            var _this = this;
            this._darkColor = "#011C2C";
            this._hclStyle = null;
            this._options = {
                duration: 1000,
                includeImageLayers: true,
                includeMarkers: true,
                maxZoom: 20,
                minZoom: 1,
                padding: 100,
                sources: null,
                style: "light",
                type: "jump"
            };
            this._buttonCSS = (`
                .azure-maps-control-button.autofocus {
                    margin: 0;
                    padding: 0;
                    border: none;
                    border-collapse: collapse;
                    width: 32px;
                    height: 32px;
                    text-align: center;
                    cursor: pointer;
                    line-height: 32px;
                    background-repeat: no-repeat;
                    background-size: 16px;
                    background-position: center center;
                    z-index: 200;
                    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAbFBMVEUAAACDiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI2DiI03FbuiAAAAJHRSTlMA/u0nHJKM5XYhx5jghn1jXEQL9dzOvqmgblU5FNSkYLhRDzBqzJ2lAAABJklEQVRIx+2TyXaDMAxFZTxgQ5gSEsZAk/7/P/ac1mCDjcoJmyxyd8gPyXqS4cOL0IcUnAvZ0h3ic1sFZCao8jMqZ2JSm384286eXIiHi3j69V1JNjgVPr0kCKmrj83plWdF1xWjiEysXuvrubxklgnyNMWrpV5MnjSwopl843Y018Eb81j9pQ8zE1M6SwxeuLbXDF7nELBBouuDpnDb8lvyWJQsra2huZQ5tXbgvrhy+vtlppn9HZO7abNbjK8P7YZVZI2Q2o2HbHYuGeZkNFzs6vcUHwfhXdu+XO1dDzgxWTHgekUcKGCkxCEBjBtxiAAjJA4BYASeJ32gwoEeUJeOzwGfdA04z9275N/WkMK/sMhySMEe8qt+PiPsRbVN0yr48L78AC72C4TggTqUAAAAAElFTkSuQmCC");
                }
                .azure-maps-control-button.autofocus:hover {
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAflBMVEUAAAAxrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4xrM4L4XLgAAAAKnRSTlMA/u375ZWMdiaGIR3goH1jXBoL9dzOyL6pkG5VRSoU1JlgN8S4pFE/DzDuQwzKAAABOElEQVRIx+1UyZaCMBBMWBIWBURAdgXHZf7/B8fnZCEk5BGfBw/WrXe6ugL44kV4V4xcF+GmW5GcNqUFGawySbXpO0SzeU0VLnf391CBPbqr828ZXMCmVeVjGy7CjuT8E4/mVdyOYzuggvfYzvO3bDwOJyTgDfWXYj6inNRghpry5k69CXEeQgXVPyQYc19g0SZKVIRej3lIDwQW4JP51G7ltdSUXIWRWTqRX4Jx0nE7PQqfHD2tGwvH/2F45GuOz4vQ8/XOwzgxBgrIkLM93Yfl7Bhz/oU16xxBq7/UP1x8pWz7bKa7XghrJMVFpEVgS0L1tAURlOBrCw5yQaEtcOQCS1tgKZ608QTTHc7vZSk0vQNwDS8N7qZaAp5AlLPiBx6eJ1cOwBokOXk+A1iLoKnrJgBffC7+ADCvDbtj7VSEAAAAAElFTkSuQmCC");
                }
            `);


            /**
             * An event handler for when the map style changes. Used when control style is set to auto.
             */

            this._mapStyleChanged = function() {
                var self = _this;
                if (self._button && !self._hclStyle) {
                    self._button.style.backgroundColor = self._getColorFromMapStyle();
                }
            }

            this.setOptions(options);
        }


        /****************************
         * Public Methods
         ***************************/

        /**
         * Action to perform when the control is added to the map.
         * @param map The map the control was added to.
         * @param options The control options used when adding the control to the map.
         * @returns The HTML Element that represents the control.
         */

        AutofocusControl.prototype.onAdd = function(map, options) {
            var self = this;
                self._map = map;
            var opt = self._options;
            var ariaLabel = AutofocusControl._getAriaLabel(map.getStyle().language);

            // Add the CSS style for the control to the DOM
            var style = document.createElement("style");
                style.innerHTML = self._buttonCSS;
            document.body.appendChild(style);

            // Create a button container
            var c = document.createElement("div");
                c.classList.add("azure-maps-control-container");
                c.setAttribute("aria-label", ariaLabel);
                c.style.flexDirection = "column";
            self._container = c;

            // Create the button
            var btn = document.createElement("button");
                btn.classList.add("azure-maps-control-button", "autofocus");
                btn.setAttribute("title", ariaLabel);
                btn.setAttribute("alt", ariaLabel);
                btn.setAttribute("type", "button");
            self._button = btn;
            self._setStyle(opt.style);
            btn.addEventListener("click", function() {
                var bbox = azmaps.data.BoundingBox;

                // Logic that gets all shapes on the map and calculates the bounding box of the map   
                var data = [];
                var sources = map.sources.getSources();
                sources.forEach(function(s) {
                    if (s instanceof azmaps.source.DataSource) {
                        if (!opt.sources || opt.sources.indexOf(s.getId()) > -1) {
                            data = data.concat(s.toJson().features);
                        }
                    }
                });
                var bounds = null;
                if (data.length > 0) {
                    bounds = bbox.fromData(data);
                }
                if (opt.includeMarkers) {
                    var pos = [];
                    for (var _i = 0, _a = map.markers.getMarkers(); _i < _a.length; _i++) {
                        var marker = _a[_i];
                        pos.push(marker.getOptions().position);
                    }
                    if (pos.length > 0) {
                        var b = bbox.fromPositions(pos);
                        if (bounds === null) {
                            bounds = b;
                        } else {
                            bounds = bbox.merge(bounds, b);
                        }
                    }
                }
                if (opt.includeImageLayers) {
                    var l = map.layers.getLayers();
                    for (var i = 0; i < l.length; i++) {
                        if (l[i] instanceof azmaps.layer.ImageLayer) {
                            var b = bbox.fromPositions(l[i].getOptions().coordinates);
                            if (bounds === null) {
                                bounds = b;
                            } else {
                                bounds = bbox.merge(bounds, b);
                            }
                        }
                    }
                }
                if (bounds !== null) {
                    var w = bbox.getWidth(bounds);
                    var h = bbox.getHeight(bounds);

                    // If the bounding box is really small, likely a single point, use center/zoom.
                    if (w < 0.00001 && h < 0.00001) {
                        map.setCamera({
                            center: bbox.getCenter(bounds),
                            duration: opt.duration,
                            maxZoom: opt.maxZoom,
                            minZoom: opt.minZoom,
                            type: opt.type,
                            zoom: 17
                        });
                    } else {
                        map.setCamera({
                            bounds: bounds,
                            duration: opt.duration,
                            maxZoom: opt.maxZoom,
                            minZoom: opt.minZoom,
                            padding: opt.padding,
                            type: opt.type
                        });
                    }
                }
            });
            c.appendChild(btn);
            return c;
        }


        /**
         * Action to perform when control is removed from the map.
         */

        AutofocusControl.prototype.onRemove = function() {
            var self = this;
            if (self._container) {
                self._container.remove();
                self._container = null;
            }
            if (self._options.style === "auto") {
                self._map.events.remove("styledata", self._mapStyleChanged);
            }
            self._map = null;
        }


        /**
         * Sets the options on the control.
         * @param options The options to set.
         */

        AutofocusControl.prototype.setOptions = function(opt) {
            if (opt) {
                var o = this._options;
                if (typeof opt.duration === "number") {
                    o.duration = opt.duration;
                }
                if (typeof opt.includeImageLayers === "boolean") {
                    o.includeImageLayers = opt.includeImageLayers;
                }
                if (typeof opt.includeMarkers === "boolean") {
                    o.includeMarkers = opt.includeMarkers;
                }
                if (typeof opt.duration === "number") {
                    o.maxZoom = opt.maxZoom;
                }
                if (typeof opt.duration === "number") {
                    o.minZoom = opt.minZoom;
                }
                if (typeof opt.padding === "number" && opt.padding >= 0) {
                    o.padding = opt.padding;
                }
                if (opt.sources !== undefined) {
                    if (opt.sources === null || opt.sources.length === 0) {
                        o.sources = null;
                    } else {
                        var sources_1 = [];
                        opt.sources.forEach(function(s) {
                            sources_1.push((s instanceof azmaps.source.DataSource) ? s.getId() : s);
                        });
                        o.sources = sources_1;
                    }
                }
                if (opt.style) {
                    this._setStyle(opt.style);
                }
                if (opt.type) {
                    o.type = opt.type;
                }
            }
        }


        /****************************
         * Private Methods
         ***************************/

        /**
         * Sets the style of the control.
         * @param style The style to set.
         * @returns
         */

        AutofocusControl.prototype._setStyle = function(style) {
            var self = this;
            var map = self._map;
            // Of style is already "auto", remove the map event.
            if (self._options.style === "auto" && map) {
                map.events.remove("styledata", self._mapStyleChanged);
            }
            var color = "light";
            if (self._hclStyle) {
                if (self._hclStyle === "dark") {
                    color = self._darkColor;
                }
            } else {
                color = style;
            }
            if (color === "light") {
                color = "white";
            } else if (color === "dark") {
                color = self._darkColor;
            } else if (color === "auto") {
                if (map) {
                    // Color will change between light and dark depending on map style.
                    map.events.add("styledata", self._mapStyleChanged);
                }
                color = self._getColorFromMapStyle();
            }
            self._options.style = style;
            if (self._button) {
                self._button.style.backgroundColor = color;
            }
        }


        /**
         * Retrieves the background color for the button based on the map style. This is used when style is set to auto.
         */

        AutofocusControl.prototype._getColorFromMapStyle = function() {
            // When the style is dark (i.e. satellite, night), show the dark colored theme.
            if (["satellite", "satellite_road_labels", "grayscale_dark", "night"].indexOf(this._map.getStyle().style) > -1) {
                return this._darkColor;
            }
            return "white";
        }


        /**
         * Returns the set of translation text resources needed for the center and zoom control for a given language.
         * @param lang The language code to retrieve the text resources for.
         * @returns The translated text for the aria label for the center and zoom control.
         */

        AutofocusControl._getAriaLabel = function(lang) {
            if (lang && lang.indexOf("-") > 0) {
                lang = lang.substring(0, lang.indexOf("-"));
            }
            var resx = {
                af: "Fokus alle data",
                ar: "تركيز جميع البيانات",
                eu: "Datu guztiak fokatu",
                bg: "Фокусирайте всички данни",
                zh: "集中所有数据",
                hr: "Fokusirajte sve podatke",
                cs: "Zaměřte všechna data",
                da: "Fokusér alle data",
                nl: "Alle gegevens focussen",
                et: "Fokuseeri kõik andmed",
                fi: "Keskitä kaikki tiedot",
                fr: "Concentrez toutes les données",
                gl: "Concentrar todos os datos",
                de: "Alle Daten fokussieren",
                el: "Εστίαση όλων των δεδομένων",
                hi: "सभी डेटा पर ध्यान केंद्रित करें",
                hu: "Összpontosítson minden adatot",
                id: "Fokuskan semua data",
                it: "Focalizza tutti i dati",
                ja: "すべてのデータを集中させる",
                kk: "Барлық деректерге назар аударыңыз",
                ko: "모든 데이터에 집중",
                es: "Enfocar todos los datos",
                lv: "Fokusēt visus datus",
                lt: "Sutelkti visus duomenis",
                ms: "Fokuskan semua data",
                nb: "Fokuser all data",
                pl: "Skoncentruj wszystkie dane",
                pt: "Focar todos os dados",
                ro: "Concentrați toate datele",
                ru: "Сфокусировать все данные",
                sr: "Fokusiraj sve podatke",
                sk: "Zamerať všetky údaje",
                sl: "Osredotočite vse podatke",
                sv: "Fokusera alla data",
                th: "โฟกัสข้อมูลทั้งหมด",
                tr: "Tüm verileri odaklayın",
                uk: "Сфокусувати всі дані",
                vi: "Tập trung tất cả dữ liệu",
                en: "Focus All Data"
            };
            var val = resx[lang.toLowerCase()];
            if (val) {
                return val;
            }
            return resx["en"];
        }

        return AutofocusControl;
    }());

    var baseControl = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AutofocusControl: AutofocusControl
    });

    var control = Namespace.merge("atlas.control", baseControl);

    exports.control = control;

}(this.atlas = (this.atlas || {}), atlas));
