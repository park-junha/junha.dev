import {
  animate,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(
      ':leave',
      [
        style({ opacity: 1, transform: 'translate(0, 0)' }),
        animate('0.1s', style({
          opacity: 0,
          transform: 'translate(0, 10px)'
        }))
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translate(0, -10px)' }),
        animate('0.2s', style({
          opacity: 1,
          transform: 'translate(0, 0)'
        }))
      ],
      { optional: true }
    )
  ])
]);
