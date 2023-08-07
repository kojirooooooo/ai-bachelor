import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private overlayRef: OverlayRef;
  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create({ height: '100%', width: '100%' });
  }

  readonly duration = 1000;

  private _visible: boolean = false;
  private _timeoutId?: NodeJS.Timeout;

  get visible() {
    return this._visible;
  }

  async show() {
    if (!this._timeoutId) {
      clearTimeout(this._timeoutId);
      this.overlayRef.detach();
      this._timeoutId = undefined;
    }
    this._visible = true;
    this.overlayRef.attach(new ComponentPortal(LoadingComponent));
  }

  hide() {
    this._visible = false;
    this._timeoutId =
      this._timeoutId ||
      setTimeout(() => {
        this.overlayRef.detach();
        this._timeoutId = undefined;
      }, this.duration);
  }
}
