# Leiden

Kişisel yönetim uygulaması: emek ve sermaye takibi, maliye, planlama ve Edina Haritası tek bir sayfada.

Leiden tek bir HTML dosyasıdır. Kurulum, sunucu veya derleme gerektirmez. Dosyayı tarayıcıda açman ya da GitHub Pages ile yayınlaman yeterli.

## Modüller

| Modül | İçerik |
|---|---|
| **🏠 Ana Sayfa** | Selamlama ve Edina tarihi, günün sözü, modül kartlarında canlı özetler, bugünün planları, son notlar, okunanlar. |
| **La Merite** | Emek (EMR) ve sermaye (C<sub>MR</sub>) takibi, Hazine (H<sub>MR</sub>). Haftalık giriş (Cumartesi → Cuma), takvim, haftalık özet, günlük tarihçe. |
| **Thistle** | Maliye: bankalar ve hesaplar (aynı hesapta birden fazla para birimi), kurlar, harcamalar, aylık sabit giderler. |
| **Nivose** | Günlük ve aylık planlar, Tamamlanmadı / Tamamlandı bölümleri ve tüm tamamlananların arşivi. Her plan Edina Haritasındaki bir öğeye bağlanabilir. |
| **⚖️ Müzakere** | Parlamento, Konferans ve Kongre türünde müzakereler: taraflar ve beyanları, tartışmalar, alınan kararlar. Tek müzakere PDF / Markdown, liste PDF, tümü JSON olarak dışa aktarılır. |
| **Edina Haritası** | Unirce → Perce → Parce hiyerarşisi ve Linden Union Şirketleri (Şirket → Proje). |
| **Academy** | Akademilere bağlı makaleler ve okumalar (dosyalar private veri reposunda `Essais/` altında), okunan kitaplar. |
| **📜 Oowtory** | Yıllık defter: adlandırılmış aylar, `Anahtar : Değer` biçiminde günlük kayıtlar, ay/yıl PDF çıktısı, metinden içe aktarma. |
| **Notlar** | Notion tarzı iç içe sayfalar ve blok düzenleyici: `/` menüsü, Markdown kısayolları, sürükle-bırak, Markdown içe/dışa aktarma. |
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
- **GitHub Pages ile:** `index.html`, `sw.js`, `manifest.webmanifest` ve `icons/` klasörünü public bir repoya yükle. Repo **Settings → Pages → Deploy from a branch → `main` / root** ayarını yap. Sayfa `https://<kullanıcı>.github.io/<repo>/` adresinde açılır.
- **iPhone'da uygulama olarak:** Sayfayı Safari'de aç → **Paylaş → Ana Ekrana Ekle**. Leiden tam ekran açılır, bir kez açıldıktan sonra çevrimdışı da çalışır. Service worker sayfayı her açılışta önce ağdan alır, yeni sürüm hemen gelir. GitHub senkronu hiçbir zaman önbelleğe alınmaz. (`file://` ile açıldığında service worker devre dışıdır.)

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
  "version": 6,
  "savedAt": "2026-10-15T12:00:00.000Z",
  "entries": { "2026-10-10": { "activities": { "P": 2, "CL": 1 }, "likit": null, "pkur": null } },
  "thistle": { "holders": [], "rates": {}, "expenses": [], "fixed": [] },
  "nivose":  { "plans": [] },
  "muzakere": { "items": [ { "type": "parlamento", "title": "", "date": "", "link": "", "parties": [], "debates": [], "decisions": [] } ] },
  "map":     { "unirces": [], "companies": [], "tags": [] },
  "academy": { "entries": [], "books": [] },
  "notes":   { "pages": [] },
  "oowtory": { "years": {}, "months": {}, "days": {} }
}
```

### Academy dosyaları

Makale ve okuma dosyaları JSON'a gömülmez. Veri reposunda klasör yapısıyla saklanır:

```
leiden-data/
├── data/leiden.json
└── Essais/
    ├── Busena Academy/…
    ├── Claire Academy/Manipulation/…
    └── …
```

- **Academy → Klasörden içe aktar**: Bilgisayardaki `Essais` klasörünü seç. Dosyalar repoya aynı yapıyla yüklenir. Zaten kayıtlı olanlar atlanır, yarıda kalan bir içe aktarma tekrar başlatılabilir.
- **Academy → Repodan tara**: `Essais/` altına başka bir yolla (GitHub Desktop vb.) eklenen dosyalar için kayıt oluşturur.
- Klasör adı Edina Haritasındaki bir Perce ya da Parce adıyla eşleşirse o akademiye bağlanır. Adında "Academy" / "Akademi" geçen bloklar otomatik olarak akademi sayılır, diğerleri ⋯ menüsünden işaretlenebilir.
- Dosya başına sınır 25 MB'tır.

### Kısayollar

Uygulamada herhangi bir yerde **?** tuşuna basmak (ya da logonun yanındaki ⌨️ butonu) tüm modüllerin kısayollarını ve yazım biçimlerini gösteren pencereyi açar.

### Oowtory

Her gün bir metin alanıdır: her satır `Anahtar : Değer`, `*italik*` için yıldız, gruplar arasına `---`.
Anahtar, Edina Haritası'ndaki bir Unirce / Perce / Parce ya da Linden Union'daki bir şirket / proje adıyla eşleşirse o bloğun renginde bir nokta alır; tıklanınca haritada o blok açılır.
**PDF** butonu tarayıcının yazdırma penceresini açar; hedef olarak **PDF olarak kaydet** seçilir. Altlıkta ay adı ve sayfa numarası yer alır.
**İçe aktar** ile Notion PDF'inden kopyalanan metin yapıştırılabilir; `01/04/2026` ya da `🌼 01/04/2026 - Gün adı` satırları yeni gün başlatır.
**📦 Arşivi içe aktar** (yıl görünümü) `{years, months, days}` biçimindeki bir Oowtory arşivini ya da tam bir Leiden yedeğini birleştirir. Boş günler ve ay adları doldurulur. Farklı metne sahip mevcut günler için değiştirme / koruma sorulur. `Oowy/Oowtory-Arsiv.json`, 2023 Ocak – 2026 Ağustos arasındaki geçmiş dökümleri (44 ay, 1337 gün) bu biçimde içerir.

> ⚠️ `Essais`, `Notlar`, `Oowy` ve `Oowy Archive` klasörlerini sayfanın bulunduğu **public** repoya yükleme. Kişisel içerik yalnızca private veri reposunda durmalı.

### Notlar kısayolları

| Yaz | Sonuç |
|---|---|
| `/` | Blok menüsü |
| `# ` · `## ` · `### ` | Başlık 1 · 2 · 3 |
| `- ` | Madde listesi |
| `1. ` | Numaralı liste |
| `[] ` | Yapılacak |
| `> ` | Alıntı |
| `! ` | Bilgi kutusu |
| ```` ``` ```` | Kod |
| `---` | Ayırıcı |
| Ctrl+B / Ctrl+I / Ctrl+U | Kalın / italik / altı çizili |

Çok satırlı metin yapıştırıldığında Markdown olarak bloklara dönüşür. Markdown dosyası içe aktarılırken birden fazla `#` başlığı varsa ilki ana sayfa, diğerleri alt sayfa olur.

Unirce ve şirket resimleri 256 piksele küçültülüp bu dosyanın içinde saklanır. Haritadaki her blok isteğe bağlı olarak `color` (blok rengi) ve `tags` (etiket id listesi) alanlarını taşır. Eski sürümlerle (version 2) kaydedilmiş dosyalar olduğu gibi açılır.
