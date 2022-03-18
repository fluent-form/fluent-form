'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ngx-fluent-form documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/FluentFormModule.html" data-type="entity-link" >FluentFormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FluentFormModule-68e37e0eaf149d2da1d4e5dbed47802c68b5d1964f42dd319f7052fe0436e40069cf687131dd43f4809d06a525bac3200d6f99b7edbc2e2fbd155fc1764f611e"' : 'data-target="#xs-components-links-module-FluentFormModule-68e37e0eaf149d2da1d4e5dbed47802c68b5d1964f42dd319f7052fe0436e40069cf687131dd43f4809d06a525bac3200d6f99b7edbc2e2fbd155fc1764f611e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FluentFormModule-68e37e0eaf149d2da1d4e5dbed47802c68b5d1964f42dd319f7052fe0436e40069cf687131dd43f4809d06a525bac3200d6f99b7edbc2e2fbd155fc1764f611e"' :
                                            'id="xs-components-links-module-FluentFormModule-68e37e0eaf149d2da1d4e5dbed47802c68b5d1964f42dd319f7052fe0436e40069cf687131dd43f4809d06a525bac3200d6f99b7edbc2e2fbd155fc1764f611e"' }>
                                            <li class="link">
                                                <a href="components/FluentFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FluentFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-FluentFormModule-68e37e0eaf149d2da1d4e5dbed47802c68b5d1964f42dd319f7052fe0436e40069cf687131dd43f4809d06a525bac3200d6f99b7edbc2e2fbd155fc1764f611e"' : 'data-target="#xs-directives-links-module-FluentFormModule-68e37e0eaf149d2da1d4e5dbed47802c68b5d1964f42dd319f7052fe0436e40069cf687131dd43f4809d06a525bac3200d6f99b7edbc2e2fbd155fc1764f611e"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-FluentFormModule-68e37e0eaf149d2da1d4e5dbed47802c68b5d1964f42dd319f7052fe0436e40069cf687131dd43f4809d06a525bac3200d6f99b7edbc2e2fbd155fc1764f611e"' :
                                        'id="xs-directives-links-module-FluentFormModule-68e37e0eaf149d2da1d4e5dbed47802c68b5d1964f42dd319f7052fe0436e40069cf687131dd43f4809d06a525bac3200d6f99b7edbc2e2fbd155fc1764f611e"' }>
                                        <li class="link">
                                            <a href="directives/FluentEventBinderDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FluentEventBinderDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FluentPropertyBinderDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FluentPropertyBinderDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BaseFormControlOptions.html" data-type="entity-link" >BaseFormControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CascaderControlOptions.html" data-type="entity-link" >CascaderControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CheckboxControlOptions.html" data-type="entity-link" >CheckboxControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateControlOptions.html" data-type="entity-link" >DateControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatePickerControlOptions.html" data-type="entity-link" >DatePickerControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmbeddedFormOptions.html" data-type="entity-link" >EmbeddedFormOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InputControlOptions.html" data-type="entity-link" >InputControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NumberInputControlOptions.html" data-type="entity-link" >NumberInputControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RadioControlOptions.html" data-type="entity-link" >RadioControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RangePickerControlOptions.html" data-type="entity-link" >RangePickerControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RealFormControlOptions.html" data-type="entity-link" >RealFormControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectControlOptions.html" data-type="entity-link" >SelectControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SliderControlOptions.html" data-type="entity-link" >SliderControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SwitchControlOptions.html" data-type="entity-link" >SwitchControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TextareaControlOptions.html" data-type="entity-link" >TextareaControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimePickerControlOptions.html" data-type="entity-link" >TimePickerControlOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});