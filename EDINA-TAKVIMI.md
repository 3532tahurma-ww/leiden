# Edina Takvimi

Edina Takvimi, standart Miladi takvimin üzerine kurulu, **Eylül 2006**'yı başlangıç noktası (1. ay) kabul eden hesaplanmış bir takvim sistemidir. Edina MR Sistemi içinde tarihleri bu takvime göre ifade etmek için kullanılır.

## Temel Kural

- **Eylül 2006 = 1. Ay**
- Her takip eden ay, sırayla bir artar (Ekim 2006 = 2. Ay, Kasım 2006 = 3. Ay, ...).
- Yıl geçtikçe ay sayısı kesintisiz artmaya devam eder; takvim "yıl" kavramını sıfırlamaz, yalnızca tek bir sürekli ay sayacı tutar.

## Format

Bir tarih Edina Takviminde şu şekilde yazılır:

```
AY-GÜN
```

- **AY**: Eylül 2006'dan bu yana geçen ay sayısı (1'den başlar, hiçbir zaman sıfırlanmaz).
- **GÜN**: O ayın kaçıncı günü olduğu (ayın gün numarası, 2 haneli, örn. `05`).
- Ay ve gün arasına `-` (tire) konur.

### Örnek

**5 Eylül 2026** tarihi Edina Takviminde:

```
241-05
```

Çünkü:
- Eylül 2006'dan Eylül 2026'ya kadar tam **20 yıl = 240 ay** geçmiştir.
- Eylül 2006, 1. ay olduğu için Eylül 2026, **240 + 1 = 241. ay** olur.
- Ayın 5. günü olduğu için gün kısmı `05` yazılır.
- Sonuç: **241-05**

## Hesaplama Formülü

Verilen bir Miladi tarih için (yıl `Y`, ay `M`, gün `G`):

```
Edina Ayı = (Y - 2006) × 12 + (M - 9) + 1
Edina Tarihi = "{Edina Ayı}-{G, 2 haneli}"
```

### Ek Örnekler

| Miladi Tarih      | Edina Ayı Hesabı                  | Edina Tarihi |
|--------------------|------------------------------------|--------------|
| 1 Eylül 2006       | (2006-2006)×12 + (9-9) + 1 = 1     | `1-01`       |
| 1 Ekim 2006        | (2006-2006)×12 + (10-9) + 1 = 2    | `2-01`       |
| 1 Ocak 2007        | (2007-2006)×12 + (1-9) + 1 = 5     | `5-01`       |
| 15 Mart 2020       | (2020-2006)×12 + (3-9) + 1 = 163   | `163-15`     |
| 5 Eylül 2026       | (2026-2006)×12 + (9-9) + 1 = 241   | `241-05`     |

## Uygulamadaki Kullanımı

Leiden (`index.html`) içinde Edina Takvimi şu yerlerde kullanılır:

1. **Takvim** görünümünde (Cumartesi → Cuma haftalar), her günün Edina karşılığı ve ayın Edina ay numarası gösterilir.
2. **Üst istatistik şeridinde**, bugünün Edina Tarihi ayrı bir kutuda gösterilir.
3. **Günlük Tarihçe** tablosunda, her kayıt satırı için Edina Tarihi ayrı bir sütunda listelenir.
4. **Edina Takvimi Dönüştürücü** bölümünde, herhangi bir tarih seçilerek (kayıt oluşturmadan) Edina karşılığı görülebilir.
