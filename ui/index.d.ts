import St from '@gi-types/st1';
import Clutter from '@gi-types/clutter10';
import Signals from '@gnome-shell-ts-declarations/signals';
import GObject from '@gi-types/gobject2';

export class BoxPointer extends St.Widget {
  constructor(arrowSide: St.Side, binProperties: St.Bin.ConstructorProperties);
  vfunc_captured_event(event: Clutter.Event): typeof Clutter.EVENT_PROPAGATE;
  open(animate: BoxPointer.PopupAnimation, onComplete: () => void): void;
  close(animate: BoxPointer.PopupAnimation, onComplete: () => void): void;
  vfunc_get_preferred_width(forHeight: number): [number, number];
  vfunc_get_preferred_height(forWidth: number): [number, number];
  vfunc_allocate(box: Clutter.ActorBox): void;
  setPosition(sourceActor: Clutter.Actor, alignment: Clutter.ActorAlign): void;
  setSourceAlignment(alignment: Clutter.ActorAlign): void;
  setArrowOrigin(origin: St.Side): void;
  setArrowActor(actor: Clutter.Actor): void;
  updateArrowSide(side: St.Side): void;
  getPadding(side: St.Side): number;
  getArrowHeight(): number;
}
export namespace BoxPointer {
  export enum PopupAnimation {
    NONE = 0,
    SLIDE = 1 << 0,
    FADE = 1 << 0,
    FULL = ~0
  }
}

export namespace popupMenu {
  export class PopupMenu extends popupMenu.PopupMenuBase {
    constructor(sourceActor: Clutter.Actor, arrowAlignment: Clutter.ActorAlign, arrowSide: St.Side);
  
    setArrowOrigin(origin: St.Side): void;
    setSourceAlignment(alignment: Clutter.ActorAlign): void;
    open(animate: BoxPointer.PopupAnimation): void; // emits 'open-state-changed'
    close(animate: BoxPointer.PopupAnimation): void; // emits 'open-state-changed'
    destroy(): void;
  }
  export enum Ornament {
    NONE = 0,
    DOT = 1,
    CHECK = 2,
    HIDDEN = 3,
  }
  export function isPopupMenuItemVisible(child: GObject.Object);
  export function arrowIcon(side: St.Side): St.Icon;

  export class PopupMenuBase extends Signals.EventEmitter {
    constructor(sourceActor: Clutter.Actor, styleClass: string);
    get sourceActor(): Clutter.Actor;
    get focusActor(): Clutter.Actor;
    getSensitive(): boolean;
    setSensitive(sensitive: boolean): void;
    get sensitive(): boolean;
    set sensitive(sensitive: boolean);
    addAction(title: string, callback: (arg0: Clutter.Event) => void, icon: St.Icon): PopupMenuItem;
    addSettingsAction(title: string, desktopFile: string): PopupMenuItem;
    isEmpty(): boolean;
    itemActivated(animate: BoxPointer.PopupAnimation): void;
    moveMenuItem(menuItem: PopupMenuItem, position: number): void;
    addMenuItem(menuItem: PopupMenuItem, position: number): void;
    get firstMenuItem(): PopupMenuItem | null;
    get numMenuItems(): number;
    removeAll(): void;
    toggle(): void;
    destroy(): void;
  }

  export class PopupBaseMenuItem extends St.BoxLayout {
    constructor(params?: {});
    get actor(): PopupBaseMenuItem;

    vfunc_button_press_event(): typeof Clutter.EVENT_PROPAGATE;
    vfunc_button_release_event(): typeof Clutter.EVENT_STOP;
    vfunc_touch_event(touchEvent: Clutter.TouchEvent): typeof Clutter.EVENT_PROPAGATE;
    vfunc_key_press_event(keyEvent: Clutter.KeyEvent): typeof Clutter.EVENT_PROPAGATE;
    vfunc_key_focus_in(): void;
    vfunc_key_focus_out(): void;
    activate(event: Clutter.Event);
    get active(): boolean;
    set active(active: boolean);
    syncSensitive(): void;
    getSensitive(): boolean;
    setSensitive(sensitive: boolean): void;
    get sensitive(): boolean;
    set sensitive(sensitive: boolean);
    setOrnament(ornament: Ornament): void;
  }
  export class PopupMenuItem extends PopupBaseMenuItem {
    constructor(text: string, params?: {});
  }
  export class PopupSeparatorMenuItem extends PopupBaseMenuItem {
    constructor(text: string);
  }
  export class Switch extends St.Bin {
    constructor(state: boolean);
    get state(): boolean;
    set state(state: boolean);
    toggle(): void;
  }
  export class PopupSwitchMenuItem extends PopupBaseMenuItem {
    constructor(text: string, active: boolean, params?: {});
    setStatus(text: string): void;
    activate(event: Clutter.Event): void;
    toggle(): void;
    get state(): boolean;
    setToggleState(state: boolean): void;
    checkAccessibleState(): void;
  }
  export class PopupImageMenuItem extends PopupBaseMenuItem {
    constructor(text: string, icon: St.Icon, params?: {});
    setIcon(icon: St.Icon): void;
  }

  export class PopupDummyMenu extends Signals.EventEmitter {
    constructor(sourceActor: Clutter.Actor);
    getSensitive(): boolean;
    get sensitive(): boolean;
    open(): void;
    close(): void;
    toggle(): void;
    destroy(): void;
  }

  export class PopupSubMenu extends PopupMenuBase {
    constructor(sourceActor: Clutter.Actor, sourceArrow: Clutter.Actor);
    getSensitive(): boolean;
    get sensitive(): boolean;
    open(animate: BoxPointer.PopupAnimation): void;
    close(animate: BoxPointer.PopupAnimation): void;
  }

  export class PopupMenuSection extends PopupMenuBase {
    constructor();
    open(): void;
    close(): void;
  }

  export class PopupSubMenuItem extends PopupBaseMenuItem {
    constructor(text: string, wantIcon: boolean);
    syncSensitive(): void;
    setSubmenuShown(open: boolean): void;
    vfunc_key_press_event(keyPressEvent: Clutter.KeyEvent): typeof Clutter.EVENT_PROPAGATE;
    activate(_event: Clutter.Event): void;
    vfunc_button_release_event(): typeof Clutter.EVENT_STOP;
    vfunc_touch_event(touchEvent: Clutter.TouchEvent): typeof Clutter.EVENT_PROPAGATE;
  }
  
  export class PopupMenuManager {
    constructor(owner: any, grabParams: Map<string, any>);
    addMenu(menu: PopupMenuBase, position: number): void;
    removeMenu(menu: PopupMenuBase): void;
    ignoreRelease(): void;

  }
}

export class main {
  static panel: panel;
}

export class panel extends St.Widget {
  get boxOpacity(): number;
  set boxOpacity(value: number);

  addToStatusArea(role: string, indicator: panelMenu.Button, position: number, box: number): panelMenu.Button;
  toggleAppMenu(): void;
  toggleCalendar(): void;
  closeCalendar(): void;
  closeQuickSettings(): void;
}

export namespace panelMenu {
  export class ButtonBox extends St.Widget {
    parent: St.Widget;
  }
  export class Button extends ButtonBox {
    menu: popupMenu.PopupMenuBase;
    public setSensitive(sensitive: boolean): void;
    public setMenu(menu: popupMenu.PopupMenuBase): void;
  }
}
export class panelMenu {}
