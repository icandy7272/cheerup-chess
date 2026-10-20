# Release verification — 2026-10-20

## Automated

17 Node tests pass, including all 24 original exercise lines, full completion/reset, explicit alternative answers, illegal and wrong move nonmutation, deterministic replies, premature branch rejection, deflection's final queen safety, reserved ID rejection, local-storage denial, promotion, castling/en passant rights preservation, review scheduling and UTF-8 backup limits. Production build succeeds. Production dependency audit reports no vulnerabilities.

All four original motifs were independently reviewed. An early deflection example was corrected before release because its final queen could be recaptured. The corrected version uses Rxf8+ Kxf8 Qxd8+; a regression check covers all mirrored/start-position variants.

## Browser checks

- Map → story → scaffold → full first exercise; automatic reply, completion and three stars.
- Illegal bishop move leaves the board unchanged and explains the rule.
- Manual palette placement of kings, rook, bishop and pawn, then selection of scaffold answer.
- Full answer recording, save and appearance in the chapter list.
- Downloaded backup contains the recorded puzzle and completed progress.
- Restoring that backup shows a confirmation summary; after confirmation and reload both records persist.
- At 390 px width, homepage and board fit without horizontal overflow; board remains usable by tapping.

Browser checks use an agent-created in-app browser, not the user's Chrome. Localhost test records are separate from the production domain and are not shipped.

## Production

GitHub public repository: https://github.com/icandy7272/cheerup-chess

Tencent Cloud: existing Ubuntu/nginx host; isolated root `/var/www/cheerup-chess/current`, versioned release directories, isolated `chess.cheerup.tech` server block. Existing unrelated site configurations were not edited.

Dedicated Let's Encrypt certificate issued for chess.cheerup.tech; expires 2027-01-18, existing Certbot automatic renewal and nginx reload hook remain enabled. HTTPS returned 200 with matching certificate and configured security headers. GitHub initial CI passed.

## Limits

Exercises judge explicit authored solutions, not arbitrary engine equivalence. No complete original book collection, photo recognition, account synchronization or practice content for chapters 5–16 is included. The 24 built-in exercises are four themes with six variants each. Browser/system Chinese speech availability depends on the device; audio output was not independently measured. Real-device touch hardware was not tested; responsive layout and browser click behavior were checked.
