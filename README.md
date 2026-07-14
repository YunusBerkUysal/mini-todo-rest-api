# Mini Todo REST API

Todo kayıtlarını yönetmek için geliştirilmiş, katmanlı mimariye sahip bir RESTful API projesi. Node.js ve Express.js kullanılarak oluşturulan bu proje; yönlendirme (routing), controller-service-repository mimarisi, ara katman (middleware) entegrasyonu ve merkezi hata yönetimi gibi temel arka uç (backend) mühendislik prensiplerini içermektedir.

## 🚀 Özellikler ve Tamamlanan Bonus Görevler
- **Katmanlı Mimari:** Route, Controller, Service ve Repository katmanlarının birbirinden net bir şekilde ayrılması.
- **Kalıcı Veri Saklama (JSON):** Veriler, in-memory yerine `fs` modülü kullanılarak güvenli bir şekilde `todos.json` dosyasına kaydedilir ve okunur.
- **Gelişmiş Sorgulama:** `status` (durum), `priority` (öncelik) ve `search` (arama) query parametreleri ile filtreleme desteklenir.
- **Sıralama ve Sayfalama:** `sortBy`, `sortOrder`, `page` ve `limit` özellikleri sisteme entegre edilmiştir.
- **Özel Ara Katmanlar (Middlewares):** Gelen istekleri terminale yazdıran bir Logger ve uygulamanın çökmesini engelleyen merkezi hata yakalayıcılar (404 Not Found / 500 Internal Server Error).
- **Katı Doğrulama (Validation):** Başlık (3-80 karakter) ve öncelik (LOW/MEDIUM/HIGH) alanları için servis katmanında veri doğrulama kuralları uygulanmıştır.

## 🛠️ Kurulum ve Çalıştırma

1. **Gerekli paketleri yükleyin:**
   npm install

2. **Sunucuyu geliştirme modunda başlatın:**
   npm run dev
   (Sunucu http://localhost:3000 adresinde çalışmaya başlayacaktır.)

## 📌 API Uç Noktaları (Endpoints)

### 1. Tüm Görevleri Getir (Arama, Filtreleme, Sayfalama, Sıralama)
- **Metot:** GET
- **Uç Nokta:** `/api/todos`
- **Örnek Sorgu:** `/api/todos?status=completed&priority=HIGH&page=1&limit=5&sortBy=createdAt&sortOrder=desc`

### 2. ID'ye Göre Tek Görev Getir
- **Metot:** GET
- **Uç Nokta:** `/api/todos/:id`

### 3. Yeni Görev Oluştur
- **Metot:** POST
- **Uç Nokta:** `/api/todos`
- **Örnek İstek (Request Body):**
  {
    "title": "Express rotalarını çalış",
    "description": "Route, controller ve service akışını pratik et",
    "priority": "HIGH"
  }

### 4. Mevcut Görevi Güncelle
- **Metot:** PATCH
- **Uç Nokta:** `/api/todos/:id`

### 5. Görevin Tamamlanma Durumunu Değiştir
- **Metot:** PATCH
- **Uç Nokta:** `/api/todos/:id/toggle`

### 6. Görevi Sil
- **Metot:** DELETE
- **Uç Nokta:** `/api/todos/:id`

---

## 📸 Test Ekran Görüntüleri

**1. Başlangıç - Boş Liste Kontrolü (GET / 200 OK)**
![GET Boş Liste](./screenshots/1-get-empty.png)

**2. Başarılı Görev Ekleme (POST / 201 Created)**
![POST Başarılı](./screenshots/2-post-success.png)

**3. Hatalı Veri Gönderimi - Validasyon Kontrolü (POST / 400 Bad Request)**
![POST Hata](./screenshots/3-post-error.png)

**4. Görev Tamamlanma Durumunu Değiştirme (PATCH / 200 OK)**
![PATCH Toggle](./screenshots/4-patch-toggle.png)

**5. Arama ve Filtreleme (GET / 200 OK)**
![GET Filtreleme](./screenshots/5-get-filter.png)

**6. Görev Silme (DELETE / 200 OK)**
![DELETE Başarılı](./screenshots/6-delete-success.png)