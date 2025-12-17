# Backlog & Sprint Planning
## Hệ thống Trắc nghiệm & Đánh giá Năng lực Môn Phân tích Thiết kế Thuật toán

### Tổng quan Kế hoạch
Dự án áp dụng mô hình phát triển **Agile/Scrum** với kiến trúc **Modular Monolith** để đảm bảo tính mở rộng và dễ bảo trì.
Kế hoạch được chia thành 4 Sprint (2 tuần/Sprint), tập trung vào việc xây dựng nền tảng dữ liệu trước, sau đó đến các tính năng AI cốt lõi.

---

### Product Backlog (Danh sách tính năng ưu tiên)

#### 1. Nhóm Nền tảng & Dữ liệu (Foundation & Data)
- [ ] **Kiến trúc Modular**: Thiết lập cấu trúc dự án theo Modules (Auth, QuestionBank, ExamCreator, Evaluator).
- [ ] **Database Schema**: Thiết kế CSDL lưu trữ Câu hỏi, Đề thi và Đồ thị tri thức (Knowledge Graph - Node/Edge).
- [ ] **Công cụ "Thêm câu hỏi nhanh" (Quick Add)**: Tool hỗ trợ nhập liệu, tích hợp Prompt Template để sinh dữ liệu từ AI (ChatGPT/Gemini).
- [ ] **Công cụ "Kho câu hỏi" (Coverage Matrix)**: Heatmap thống kê độ phủ kiến thức (Chương vs Loại câu hỏi) để đảm bảo dữ liệu cân bằng.

#### 2. Nhóm Sinh đề thông minh (AI Exam Creator)
- [ ] **Chiến lược Random**: Sinh đề ngẫu nhiên có điều kiện (Cơ bản).
- [ ] **Chiến lược AI Adaptive**: Sinh đề thích ứng dựa trên năng lực người học (Sử dụng thuật toán Leo đồi/Heuristic hoặc CSP).
- [ ] **Giao diện Tạo đề**: Slider chọn số câu, Dropdown chọn chương, Hiệu ứng "AI Loading" (mô phỏng quá trình suy diễn).
- [ ] **Giao diện Làm bài**: Hiển thị câu hỏi, đồng hồ đếm ngược, nút "Gợi ý ngữ nghĩa" (Semantic Hint).

#### 3. Nhóm Đánh giá & Phân tích (AI Evaluator)
- [ ] **Chấm điểm & Lưu lịch sử**: Tính điểm và lưu kết quả chi tiết.
- [ ] **Chẩn đoán lỗi (Error Diagnosis)**: Sử dụng suy diễn lùi (Backward Chaining) để xác định nguyên nhân sai (Hổng kiến thức, Lỗi tính toán, Lỗi logic).
- [ ] **Biểu đồ Radar**: Hiển thị đa chiều năng lực (Khái niệm, Định lý, Tính chất, Bài tập).
- [ ] **Dự báo điểm số**: Sử dụng Hồi quy tuyến tính (Linear Regression) để dự báo kết quả tương lai.

#### 4. Nhóm Giao diện & Trải nghiệm (UI/UX)
- [ ] **Knowledge Graph View**: Hiển thị trực quan mối quan hệ giữa các đơn vị kiến thức (D3.js hoặc React Force Graph).
- [ ] **Theme & Styling**: Giao diện hiện đại (Blue/Purple theme), Responsive.

---

### Kế hoạch Sprint (Sprint Planning)

#### Sprint 1: Foundation & Data (Khởi tạo & Dữ liệu)
*Mục tiêu: Có Database, Backend chạy được và Dữ liệu câu hỏi để test.*
- [ ] **Arch**: Setup Project Structure (Flask + React), cấu hình Modular Monolith.
- [ ] **DB**: Tạo bảng `Questions`, `Chapters`, `KnowledgeNodes`, `KnowledgeEdges`.
- [ ] **Feature**: Implement API CRUD Câu hỏi.
- [ ] **Tool**: Xây dựng màn hình "Quick Add" và nhập 50-100 câu hỏi mẫu (Chương Đệ quy, Chia để trị) để phục vụ test AI.
- [ ] **UI**: Dựng Layout Dashboard cơ bản (Sidebar, Header).

#### Sprint 2: The Creator (Bộ sinh đề thông minh)
*Mục tiêu: Sinh viên có thể cấu hình và làm bài thi với thuật toán AI.*
- [ ] **AI**: Implement `RandomStrategy` (Sinh đề thường).
- [ ] **AI (Core)**: Implement `AIAdaptiveStrategy` (Thuật toán Heuristic/CSP để tối ưu hóa đề thi theo Profile user).
- [ ] **UI**: Hoàn thiện màn hình "Tạo đề thi" với các tham số cấu hình.
- [ ] **UI**: Hoàn thiện màn hình "Làm bài thi" (Question Card, Timer, Submit).

#### Sprint 3: The Mentor (Đánh giá & Phân tích)
*Mục tiêu: Hệ thống đánh giá sâu và đưa ra lời khuyên cá nhân hóa.*
- [ ] **Backend**: API `submit_exam`, tính điểm.
- [ ] **AI (Core)**: Implement Logic "Chẩn đoán lỗi" (Phân loại lỗi sai dựa trên luật dẫn).
- [ ] **AI**: Implement thuật toán Dự báo điểm (Simple Regression).
- [ ] **UI**: Màn hình "Kết quả & Lịch sử" với lời khuyên từ AI.
- [ ] **UI**: Vẽ biểu đồ Radar năng lực và Biểu đồ dự báo.

#### Sprint 4: Integration & Polish (Hoàn thiện)
*Mục tiêu: Đóng gói, làm đẹp và kiểm thử.*
- [ ] **UI**: Tích hợp Knowledge Graph Visualization (Mạng ngữ nghĩa).
- [ ] **UX**: Polish giao diện, hiệu ứng chuyển động, Dark mode (nếu kịp).
- [ ] **Testing**: Kiểm thử toàn bộ luồng (User Flow), fix bugs.
- [ ] **Doc**: Viết tài liệu hướng dẫn, Báo cáo đồ án.
