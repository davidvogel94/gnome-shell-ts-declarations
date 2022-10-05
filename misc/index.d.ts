import Gio from '@gi-types/gio';
import GObject from '@gi-types/gobject2';

export namespace signals {
  export class EventEmitter {
    connectObject(...args: any): void;
    disconnectObject(...args: any): void;
    connect_object(...args: any): void;
    disconnect_object(...args: any): void;
  }
}

export namespace signalTracker {
  export class TransientSignalHolder extends GObject.Object {
    static [GObject.signals]: { [key: string]: object };
    constructor(owner: GObject.Object);
    destroy(): void;
  }
  export class SignalManager {
    /**
     * @returns {SignalManager} - the SignalManager singleton
     */
    static getDefault(): SignalManager;
    constructor();
    /**
     * @param {GObject.Object} obj - object to get signal tracker for
     * @returns {SignalTracker} - the signal tracker for object
     */
    getSignalTracker(obj: GObject.Object): SignalTracker;
    /**
     * @param {GObject.Object} obj - object to get signal tracker for
     * @returns {?SignalTracker} - the signal tracker for object if it exists
     */
    maybeGetSignalTracker(obj: GObject.Object): SignalTracker | null;
    /**
     * @param {GObject.Object} obj - object to remove signal tracker for
     * @returns {void}
     */
    removeSignalTracker(obj: GObject.Object): void;
  }
  export class SignalTracker {
    /**
     * @param {Object=} owner - object that owns the tracker
     */
    constructor(owner: GObject.Object);
    /**
     * @param {GObject.Object} obj - tracked object
     * @param {...number} handlerIds - tracked handler IDs
     * @returns {void}
     */
    track(obj: GObject.Object, ...handlerIds: number[]): void;
    /**
     * @param {GObject.Object} obj - tracked object instance
     * @returns {void}
     */
    untrack(obj: GObject.Object): void;
    clear(): void;
    destroy(): void;
  }
  /**
   * Connect one or more signals, and associate the handlers
   * with a tracked object.
   *
   * All handlers for a particular object can be disconnected
   * by calling disconnectObject(). If object is a {Clutter.widget},
   * this is done automatically when the widget is destroyed.
   *
   * @param {GObject.Object} thisObj - the emitter object
   * @param {...any} args - a sequence of signal-name/handler pairs
   * with an optional flags value, followed by an object to track
   * @returns {void}
   */
  export function connectObject(thisObj: GObject.Object, ...args: any[]): void;
  /**
   * Disconnect all signals that were connected for
   * the specified tracked object
   *
   * @param {GObject.Object} thisObj - the emitter object
   * @param {GObject.Object} obj - the tracked object
   * @returns {void}
   */
  export function disconnectObject(thisObj: GObject.Object, obj: GObject.Object): void;

  /**
   * Register a GObject type as having a 'destroy' signal
   * that should disconnect all handlers
   *
   * @param {GObject.Type} gtype - a GObject type
   */
  function registerDestroyableType(gtype: GObject.Type): void;
}

export namespace util {
  export function spawnCommandLine(commandLine: string): void;
  export function trySpawnCommandLine(commandLine: string): void;
}

export namespace extensionUtils {
  export enum ExtensionType {
    SYSTEM = 1,
    PER_USER = 2,
  }
  export enum ExtensionState {
    ENABLED = 1,
    DISABLED = 2,
    ERROR = 3,
    OUT_OF_DATE = 4,
    DOWNLOADING = 5,
    INITIALIZED = 6,
    UNINSTALLED = 99,
  }
  export function getCurrentExtension(): object;
  export function initTranslations(domain: string): void;
  export function gettext(str: string): string;
  export function ngettext(str: string, strPlural: string, n: number): string;
  export function getSettings(schema: string): Gio.Settings;
  export function openPrefs(): void;
  export function isOutOfDate(extension: object): boolean;
  export function serializeExtension(extension: object): object;
  export function deserializeExtension(extension: object): object;
  export function installImporter(extension: object): void;
}
