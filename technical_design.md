# Tài liệu Thiết kế Kỹ thuật (Technical Design Document)
## Hệ thống Trắc nghiệm & Đánh giá Năng lực Môn Phân tích Thiết kế Thuật toán

### 1. Kiến trúc Hệ thống (System Architecture)
Hệ thống sử dụng mô hình Client-Server:
- **Frontend**: ReactJS (Single Page Application).
- **Backend**: Python Flask (RESTful API).
- **Database**: SQLite (Lưu trữ cục bộ, dễ dàng triển khai).

### 2. Công nghệ sử dụng (Tech Stack)
- **Frontend**:
  - React 18+
  - React Router DOM (Điều hướng)
  - Axios (Gọi API)
  - Chart.js / Recharts (Biểu đồ Analytics)
  - React Force Graph (Biểu diễn Knowledge Graph)
  - CSS Modules / Styled Components (Giao diện đẹp, hiện đại)
- **Backend**:
  - Flask (Web Framework)
  - SQLAlchemy (ORM cho SQLite)
  - Marshmallow (Serialization/Validation)
- **Database**:
  - SQLite 3

### 3. Thiết kế Cơ sở dữ liệu (Database Schema)

#### Bảng `Users`
- `id`: Integer, PK
- `username`: String
- `password_hash`: String
- `full_name`: String

#### Bảng `Chapters` (Chương)
- `id`: Integer, PK
- `name`: String (VD: Chương 1: Tổng quan)
- `description`: String

#### Bảng `KnowledgeNodes` (Đơn vị kiến thức - cho Knowledge Graph)
- `id`: Integer, PK
- `chapter_id`: FK -> Chapters
- `name`: String (VD: QuickSort, Master Theorem)
- `type`: Enum (Concept, Theorem, Property, Exercise)
- `description`: String

#### Bảng `Questions` (Ngân hàng câu hỏi)
- `id`: Integer, PK
- `content`: Text (Nội dung câu hỏi, hỗ trợ LaTeX)
- `options`: JSON (Danh sách đáp án A, B, C, D)
- `correct_option`: String (Key của đáp án đúng)
- `chapter_id`: FK -> Chapters
- `knowledge_node_id`: FK -> KnowledgeNodes
- `difficulty_level`: Integer (1: Cơ bản, 2: Vận dụng, 3: Nâng cao)
- `explanation`: Text (Giải thích chi tiết)

#### Bảng `Exams` (Đề thi)
- `id`: Integer, PK
- `user_id`: FK -> Users
- `created_at`: DateTime
- `mode`: Enum (Practice, Exam, Adaptive)
- `score`: Float
- `duration_seconds`: Integer

#### Bảng `ExamDetails` (Chi tiết đề thi)
- `id`: Integer, PK
- `exam_id`: FK -> Exams
- `question_id`: FK -> Questions
- `selected_option`: String
- `is_correct`: Boolean

### 4. Thiết kế API (API Endpoints)

#### Auth
- `POST /api/auth/login`
- `POST /api/auth/register`

#### Questions
- `GET /api/questions`: Lấy danh sách câu hỏi (filter theo chương, độ khó)
- `POST /api/questions`: Thêm câu hỏi mới
- `GET /api/questions/stats`: Thống kê độ phủ câu hỏi (Matrix view)

#### Exams
- `POST /api/exams/generate`: Tạo đề thi (Logic AI/Random)
- `POST /api/exams/submit`: Nộp bài
- `GET /api/exams/history`: Lấy lịch sử thi

#### Analytics
- `GET /api/analytics/radar`: Dữ liệu biểu đồ Radar
- `GET /api/analytics/forecast`: Dữ liệu dự báo điểm

### 5. Cấu trúc Thư mục (Project Structure)
```
project-root/
├── backend/
│   ├── app.py (Main entry)
│   ├── models.py (DB Models)
│   ├── routes.py (API Routes)
│   ├── services/ (Logic xử lý: AI, Exam generation)
│   └── database.db
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/ (Reusable components: Button, Card, Modal)
│   │   ├── pages/ (ExamCreator, ExamRoom, Review, History, Analytics)
│   │   ├── services/ (API calls)
│   │   ├── styles/ (Global styles, themes)
│   │   └── App.js
│   └── package.json
└── README.md
```
