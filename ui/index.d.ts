import St from '@gi-types/st1';
import Clutter from '@gi-types/clutter10';

export class PopupMenu {
  constructor(sourceActor: Clutter.Actor, arrowAlignment, arrowSide);
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
      public setSensitive(sensitive: boolean): void;
      public setMenu(menu: PopupMenu): void;
  }
}
export class panelMenu {}
