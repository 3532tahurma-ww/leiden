# Leiden

Kişisel yönetim uygulaması: emek ve sermaye takibi, maliye, planlama ve Edina Haritası tek bir sayfada.

Leiden tek bir HTML dosyasıdır. Kurulum, sunucu veya derleme gerektirmez. Dosyayı tarayıcıda açman ya da GitHub Pages ile yayınlaman yeterli.

## Modüller

| Modül | İçerik |
|---|---|
| **La Merite** | Emek (EMR) ve sermaye (C<sub>MR</sub>) takibi, Hazine (H<sub>MR</sub>). Haftalık giriş (Cumartesi → Cuma), takvim, haftalık özet, günlük tarihçe. |
| **Thistle** | Maliye: bankalar ve hesaplar (aynı hesapta birden fazla para birimi), kurlar, harcamalar, aylık sabit giderler. |
| **Nivose** | Günlük ve aylık planlar. Her plan Edina Haritasındaki bir öğeye bağlanabilir. |
| **Edina Haritası** | Unirce → Perce → Parce hiyerarşisi ve Linden Union Şirketleri (Şirket → Proje). |
| **Veri** | JSON dışa / içe aktarma ve GitHub senkronu. |

Tarihler [Edina Takvimi](EDINA-TAKVIMI.md)'ne göre de gösterilir (Eylül 2006 = 1. ay).

## La Merite: haftalık giriş

Haftayı seç ve her satıra bir gün yaz. İlk satır Cumartesi, son satır Cuma:

```
MPC 2 CL 1 P 2 E 2
CL 2 P 1 E 2
MPC 2 CL 2 E 1 P 2
P 1 CL 1 E 1
CL 6 S 5 P 2
P 3 MPC 2 E 1 CL 2 S 3
P 3 E 1 S 2
```

Her satır `KOD SAAT` çiftlerinden oluşur. Kodlar ve katsayıları:

| Kod | Faaliyet | α |
|---|---|---|
| P | Producting | 4 |
| WM | Work with Money | 4 |
| S | Socializing | 3 |
| CL | Considering & Learning | 2 |
| MPC | Media & Personal Care | 2 |
| E | Entertaining | 1 |

Günlük E<sub>MR</sub> = Σ (saat × α).

## Kullanım

- **Yerelde:** `index.html` dosyasını tarayıcıda aç.
- **GitHub Pages ile:** Dosyayı public bir repoya `index.html` adıyla yükle. Repo **Settings → Pages → Deploy from a branch → `main` / root** ayarını yap. Sayfa `https://<kullanıcı>.github.io/<repo>/` adresinde açılır.

## Veri ve GitHub senkronu

Tüm veri tarayıcının `localStorage`'ında tutulur. İstersen ayrıca bir GitHub reposundaki tek bir JSON dosyasına senkronlanır.

> ⚠️ Veriyi **private** bir repoda tut. Public repoda finansal veriler dahil her şey herkese açık olur.

### Kurulum

1. **Private veri reposu oluştur.** Örneğin `leiden-data`. "Add a README file" kutusunu işaretle, yoksa branch oluşmaz.
2. **Token oluştur.** [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new) adresine git:
   - Repository access: *Only select repositories* → `leiden-data`
   - Permissions: **Contents → Read and write**
3. **Leiden'da Veri modülünü aç ve doldur:**
   - Kullanıcı / Organizasyon: GitHub kullanıcı adın
   - Repo: `leiden-data`
   - Branch: `main`
   - Dosya yolu: `data/leiden.json`
   - Token: `github_pat_...`
4. **Ayarları Kaydet**, ardından **GitHub'a Kaydet**'e bas. Bu ilk kayıt dosyayı oluşturur.
5. İstersen **Otomatik senkron**'u aç. Açılışta veri GitHub'dan yüklenir, her değişiklikten birkaç saniye sonra GitHub'a kaydedilir.

### Önemli

- Token yalnızca o tarayıcıda saklanır, repoya yazılmaz. Her cihazda bir kez girilmesi gerekir.
- Kayıt, GitHub'daki dosyayı o cihazdaki verinin tamamıyla değiştirir, birleştirme yapmaz. Aynı anda iki cihazda düzenleme yapma.
- Hata kodları:
  - `401` → token geçersiz ya da süresi dolmuş.
  - `403` → Contents yazma izni yok.
  - `404` → kullanıcı, repo veya branch adı yanlış.

### Dosya ile yedek

**Veri → Dışa Aktar** tüm modülleri tek bir `.json` dosyası olarak indirir. **İçe Aktar** bu dosyayı geri yükler. Eski MR yedekleri de içe aktarılabilir.

### JSON yapısı

```json
{
  "app": "Leiden",
  "version": 2,
  "savedAt": "2026-10-15T12:00:00.000Z",
  "entries": { "2026-10-10": { "activities": { "P": 2, "CL": 1 }, "likit": null, "pkur": null } },
  "thistle": { "holders": [], "rates": {}, "expenses": [], "fixed": [] },
  "nivose":  { "plans": [] },
  "map":     { "unirces": [], "companies": [] }
}
```

Unirce ve şirket resimleri 256 piksele küçültülüp bu dosyanın içinde saklanır.
