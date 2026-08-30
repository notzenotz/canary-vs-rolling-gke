# Data Hasil Pengujian

Lima repetisi (P1–P5) per skenario, untuk strategi Rolling Update dan Canary.
Sumber: pengujian k6 pada aplikasi Online Boutique di GKE.

## Tabel 1 — Load Test (100 VU)

| Metrik | Percobaan | Rolling Update | Canary | Standar Ideal |
|---|---|---|---|---|
| checks succeeded | P1 | 99,95% | 99,98% | > 95% |
| | P2 | 99,96% | 99,87% | > 95% |
| | P3 | 99,60% | 100,00% | > 95% |
| | P4 | 99,99% | 99,91% | > 95% |
| | P5 | 99,94% | 99,91% | > 95% |
| http_req_failed | P1 | 0,06% | 0,02% | < 1% |
| | P2 | 0,02% | 0,15% | < 1% |
| | P3 | 0,49% | 0,00% | < 1% |
| | P4 | 0,01% | 0,02% | < 1% |
| | P5 | 0,00% | 0,02% | < 1% |
| p95 latency | P1 | 509,25 ms | 639,54 ms | < 2.000 ms |
| | P2 | 834,16 ms | 591,67 ms | < 2.000 ms |
| | P3 | 397,21 ms | 523,58 ms | < 2.000 ms |
| | P4 | 552,98 ms | 1.100,19 ms | < 2.000 ms |
| | P5 | 987,46 ms | 976,46 ms | < 2.000 ms |
| **Hasil** | P1–P5 | rolled out | Promoted | – |

## Tabel 2 — Stress Test (400 VU)

| Metrik | Percobaan | Rolling Update | Canary | Standar Ideal |
|---|---|---|---|---|
| checks succeeded | P1 | 88,87% | 86,94% | > 95% |
| | P2 | 88,27% | 88,32% | > 95% |
| | P3 | 89,05% | 89,25% | > 95% |
| | P4 | 90,23% | 80,33% | > 95% |
| | P5 | 88,04% | 85,90% | > 95% |
| http_req_failed | P1 | 0,03% | 2,83% | < 10% |
| | P2 | 0,02% | 0,21% | < 10% |
| | P3 | 0,01% | 0,02% | < 10% |
| | P4 | 0,03% | 0,03% | < 10% |
| | P5 | 0,12% | 2,60% | < 10% |
| p95 latency | P1 | 4.694,02 ms | 4.177,43 ms | < 5.000 ms |
| | P2 | 4.784,67 ms | 4.713,66 ms | < 5.000 ms |
| | P3 | 4.291,01 ms | 4.337,56 ms | < 5.000 ms |
| | P4 | 4.182,72 ms | 4.575,95 ms | < 5.000 ms |
| | P5 | 4.686,08 ms | 4.729,00 ms | < 5.000 ms |
| maksimum | P1 | 7.775,44 ms | 15.085,15 ms | – |
| | P2 | 6.888,06 ms | 7.491,43 ms | – |
| | P3 | 6.725,25 ms | 6.657,00 ms | – |
| | P4 | 6.873,64 ms | 9.322,97 ms | – |
| | P5 | 7.684,05 ms | 15.990,00 ms | – |
| **Hasil** | P1–P5 | rolled out | Rollback | – |

## Tabel 3 — Endurance Test (80 VU)

| Metrik | Percobaan | Rolling Update | Canary | Standar Ideal |
|---|---|---|---|---|
| checks succeeded | P1 | 99,91% | 99,99% | > 95% |
| | P2 | 99,89% | 100,00% | > 95% |
| | P3 | 99,99% | 99,94% | > 95% |
| | P4 | 99,91% | 99,84% | > 95% |
| | P5 | 99,82% | 99,98% | > 95% |
| http_req_failed | P1 | 0,11% | 0,00% | < 2% |
| | P2 | 0,13% | 0,0005% | < 2% |
| | P3 | 0,003% | 0,06% | < 2% |
| | P4 | 0,17% | 0,22% | < 2% |
| | P5 | 0,20% | 0,01% | < 2% |
| p95 latency | P1 | 680 ms | 688 ms | < 3.000 ms |
| | P2 | 544 ms | 627 ms | < 3.000 ms |
| | P3 | 651 ms | 680 ms | < 3.000 ms |
| | P4 | 597 ms | 805 ms | < 3.000 ms |
| | P5 | 691 ms | 738 ms | < 3.000 ms |
| Memori | P1–P5 | stabil ~12–15 MB | stabil ~12–15 MB | Stabil |
| **Hasil** | P1–P5 | rolled out | Promoted | – |

## Catatan Metrik

- Kolom "Standar Ideal" adalah threshold skrip k6 (berbeda per skenario), **bukan**
  gate promosi Flagger. Gate Flagger tetap: request-duration maks 2.000 ms (P99
  telemetri Istio) dan request-success-rate min 99%.
- `http_req_failed` = kegagalan HTTP sebenarnya; `checks succeeded` menyertakan
  assertion "respons < 2 detik" yang banyak gagal saat latency tinggi. Kedua metrik
  tidak disamakan.