import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const flyIn = trigger('flyIn', [
  state('in', style({ transform: 'translateY(100%)' })),
  transition('void => *', [
    animate(100, keyframes([
      style({ opacity: 0, transform: 'translateY(100%)', offset: 0 }),
      style({ opacity: 1, transform: 'translateY(100px)', offset: 0.3 }),
      style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
    ]))
  ])
]);
