/**
@license
Copyright (c) 2015-2018 Lablup Inc. All rights reserved.
*/
import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';

/**
`<lablup-shields>` is a complement dom-module of shields.io

Example:
    <lablup-shields app="test" description="0.1" ui="flat"></lablup-shields>

@group Lablup Elements
@element lablup-shields
*/
class LablupShields extends PolymerElement {
    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment">
            .shields {
            }
            .text {
                font-family: 'DejaVu Sans',Verdana, Geneva, sans-serif;
                font-size: 11px;
                line-height: 11px;
                padding: 4px;
                display: block;
                color: #fff;
            }
            .round {
                border-radius: 4px;
            }
        </style>
        <div class="shields layout horizontal flex">
            <div class="app horizontal layout center"><slot name="app-icon"></slot><span id="app-text" class="text app-text">{{ app }}</span></div>
            <div class="desc horizontal layout center"><slot name="desc-icon"></slot><span id="desc-text" class="text desc-text">{{ description }}</span></div>
        </div>
        `;
    }

    static get is() { return 'lablup-shields'; }
    static get properties() {
        return {
            app: {
                type: String,
                value: ''
            },
            description: {
                type: String,
                value: ''
            },
            color: {
                type: String,
                value: 'green'
            },
            appColor: {
                type: String,
                value: 'grey'
            },
            ui: {
                type: String,
                value: 'flat'
            }
        }
    }
    get _colorScheme() {
        return {
            "brightgreen": {"colorB": "#4c1", "colorT": "#222222"},
            "lightgreen": {"colorB": "#F3F5D0", "colorT": "#222222"},
            "green": {"colorB": "#97CA00"},
            "yellow": {"colorB": "#dfb317"},
            "yellowgreen": {"colorB": "#a4a61d"},
            "orange": {"colorB": "#fe7d37"},
            "red": {"colorB": "#e05d44"},
            "blue": {"colorB": "#007ec6"},
            "lightblue": {"colorB": "#caedfc", "colorT": "#222222"},
            "grey": {"colorB": "#555"},
            "gray": {"colorB": "#555"},
            "lightgrey": {"colorB": "#9f9f9f"},
            "lightgray": {"colorB": "#9f9f9f"}
        }
    }
    constructor() {
        super();
        this._formatItem();
    }
    ready() {
        super.ready();
        this._colorChanged();
        this._appColorChanged();
        this._formatItem();
        this._descriptionChanged();
        if (this.app == '') {
            this.$['app-text'].style.display = 'none';
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this._createPropertyObserver('description', '_descriptionChanged', true);
        this._createPropertyObserver('color', '_colorChanged', true);
        this._createPropertyObserver('appColor', '_appColorChanged', true);
        this._createPropertyObserver('ui', '_formatItem', true);
    }
    _classChanged() {
        this._formatItem();
    }
    _colorChanged() {
        if (this._colorScheme[this.color]) {
            this.shadowRoot.querySelector('.desc').style.backgroundColor = this._colorScheme[this.color]['colorB'];
            if (this._colorScheme[this.color]['colorT']) {
                this.shadowRoot.querySelector('.desc-text').style.color = this._colorScheme[this.color]['colorT'];
            }
        }
    }
    _appColorChanged() {
        if (this._colorScheme[this.appColor]) {
            this.shadowRoot.querySelector('.app').style.backgroundColor = this._colorScheme[this.appColor]['colorB'];
            if (this._colorScheme[this.appColor]['colorT']) {
                this.shadowRoot.querySelector('.app-text').style.color = this._colorScheme[this.appColor]['colorT'];
            }
        } else {
            this.shadowRoot.querySelector('.app').style.backgroundColor = '#555';
        }
    }
    _descriptionChanged() {
        if (this.description == 'undefined' || this.description === '') {
            this.shadowRoot.querySelector('.desc').style.display = 'none';
        } else {
            this.shadowRoot.querySelector('.desc').style.display = 'block';
        }
    }
    _formatItem() {
        if (['round'].indexOf(this.ui) >= 0) {
            this.shadowRoot.querySelector('.shields').classList.add(this.ui);
        }
    }
}
customElements.define(LablupShields.is, LablupShields);
