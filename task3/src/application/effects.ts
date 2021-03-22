import { EMPTY, interval, merge, of } from 'rxjs';
import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, mapTo, mergeMap, take, withLatestFrom } from 'rxjs/operators';

import {
  actionMessage,
  actionNext,
  actionPrev,
  actionRestart,
  actionTimer,
  actionUpdate,
} from './actions';
import type { Action } from './actions';
import { DELAY, INTERVAL } from './types';
import type { Slide, State } from './types';

/** Filter that only passes through actions of the provided type. */
export function ofType<T extends Action>(
  type: Action['type']
): MonoTypeOperatorFunction<T> {
  return filter((a) => type === a.type);
}

/**
 * Creates a combined observable that emits the following events:
 *  - a "timer" action every `INTERVAL` ms;
 *  - a "next" action every `DELAY` ms, clocked with the previous timer;
 *  - any action on demand in response to "message" actions dispatched externally.
 */
export function createEffects(
  actions$: Observable<Action>,
  state$: Observable<State>
): Observable<Action> {
  /** Produces a "timer" action every `INTERVAL` ms. */
  const timerEffect$ = interval(INTERVAL).pipe(mapTo(actionTimer()));

  /**
   * Produces a "next" action every `INTERVAL` ms,
   * provided the current progress is at least `DELAY` ms.
   *
   * Only outputs 5 of such events.
   */
  const changeSlideEffect$ = timerEffect$.pipe(
    withLatestFrom(state$),
    mergeMap(([_, state]) => (state.progress >= DELAY ? of(actionNext()) : EMPTY)),
    take(5)
  );

  /**
   * Listens to "message" actions and emits the actual actions
   * that the messages demand.
   */
  const messageEffect$ = actions$.pipe(
    ofType<ReturnType<typeof actionMessage>>('message'),
    mergeMap((a) => {
      switch (a.action) {
        case 'go-prev':
          return of(actionPrev());
        case 'go-next':
          return of(actionNext());
        case 'restart':
          return of(actionRestart());
        case 'update':
          const data: Partial<Slide> = JSON.parse(a.params);
          return of(actionUpdate(data));
        default:
          return EMPTY;
      }
    })
  );

  return merge(timerEffect$, changeSlideEffect$, messageEffect$);
}
