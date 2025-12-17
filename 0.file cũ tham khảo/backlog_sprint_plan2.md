PRODUCT BACKLOG & SPRINT PLANNING

Dự án: Hệ thống Đánh giá Năng lực Giải thuật Thích ứng (AI-Powered Adaptive Testing)
Mô hình phát triển: Agile/Scrum (Sprint 2 tuần)

1. PRODUCT BACKLOG (DANH SÁCH TÍNH NĂNG ƯU TIÊN)

ID

Module

User Story (Tính năng)

Priority

Độ phức tạp (Story Points)

CORE-01

Backend

Thiết lập kiến trúc Modular Monolith & Database (Postgres + Neo4j/Graph Schema).

High

5

DATA-01

Dev Tool

Tool "Thêm câu hỏi nhanh" (Quick Add) tích hợp Prompt mẫu để sinh dữ liệu từ ChatGPT.

High

3

DATA-02

Dev Tool

Tool "Kho câu hỏi" (Coverage Matrix) để kiểm tra độ phủ kiến thức & render LaTeX.

Medium

3

EXAM-01

AI Engine

Thuật toán sinh đề cơ bản (Random có điều kiện).

High

3

EXAM-02

AI Engine

Thuật toán sinh đề thích ứng (AI Adaptive - Heuristic/CSP).

Critical

8

UI-01

Frontend

Giao diện Tạo đề thi (Slider, Checkbox, Animation Loading AI).

High

5

UI-02

Frontend

Giao diện Làm bài thi & Nút "Gợi ý ngữ nghĩa".

High

5

ANLY-01

AI Engine

Module Chấm điểm & Cập nhật trạng thái Cây tri thức (Xanh/Đỏ).

High

5

ANLY-02

Frontend

Biểu đồ Radar năng lực & Lịch sử làm bài chi tiết.

High

5

ANLY-03

AI Engine

Module Chẩn đoán lỗi (Suy diễn lùi) & Dự báo điểm (Hồi quy).

Critical

8

RAG-01

AI Engine

RAG cơ bản: Truy xuất giáo trình PDF để hiển thị giải thích.

Medium

5

POLISH

UI/UX

Hiệu ứng chuyển động, Dark mode, Mobile responsive.

Low

3

2. LỘ TRÌNH THỰC HIỆN (SPRINT PLAN)

SPRINT 1: FOUNDATION & DATA (Khởi tạo & Dữ liệu)

Mục tiêu: Có Database, có Backend chạy được, và quan trọng nhất là Có dữ liệu câu hỏi để test.

Task 1.1 (Arch): Setup Project Structure theo mô hình src/modules (như file Architecture).

Task 1.2 (DB): Thiết kế Schema lưu câu hỏi và Schema đồ thị tri thức (Node: Concept, Edge: Is_A).

Task 1.3 (Frontend): Dựng khung Layout Dashboard (Sidebar, Header).

Task 1.4 (Feature): Code chức năng "Thêm câu hỏi nhanh" (Quick Add).

Tại sao làm cái này trước? Vì bạn cần nhập khoảng 50-100 câu hỏi vào hệ thống thì mới có cái để test thuật toán AI ở Sprint sau.

SPRINT 2: THE CREATOR (Bộ sinh đề thông minh)

Mục tiêu: Sinh viên có thể vào cấu hình đề -> AI chạy thuật toán -> Ra đề thi -> Làm bài.

Task 2.1 (AI): Cài đặt RandomStrategy.

Task 2.2 (AI - Key): Cài đặt AIAdaptiveStrategy (Thuật toán Leo đồi/CSP).

Input: Profile user (yếu chương nào), Ràng buộc (10 câu, khó).

Output: List câu hỏi tối ưu.

Task 2.3 (Frontend): Code trang "Tạo đề thi" với các hiệu ứng Loading "Fake" trạng thái AI (Đang duyệt cây...).

Task 2.4 (Frontend): Code giao diện làm bài (Question Card, Next/Prev).

SPRINT 3: THE MENTOR (Đánh giá & Phân tích)

Mục tiêu: Nộp bài xong phải thấy được sự "khác bọt" của AI so với chấm điểm thường.

Task 3.1 (Backend): API submit_exam. Tính điểm số.

Task 3.2 (AI - Key): Cài đặt Logic "Suy diễn lùi" (Backward Chaining) để tìm nguyên nhân sai.

Logic: Sai câu con -> Check câu cha -> Kết luận hổng kiến thức.

Task 3.3 (AI): Cài đặt thuật toán Hồi quy tuyến tính đơn giản để vẽ đường dự báo trên biểu đồ.

Task 3.4 (Frontend): Vẽ biểu đồ Radar (dùng thư viện Recharts) và trang Chi tiết lịch sử (hiển thị lời nhận xét của AI).

SPRINT 4: INTEGRATION & POLISH (Hoàn thiện)

Mục tiêu: Đóng gói sản phẩm, làm đẹp để demo.

Task 4.1 (RAG): Tích hợp phân hệ RAG (nếu kịp) để nút "Gợi ý" lấy text từ giáo trình PDF.

Task 4.2 (UX): Thêm View Knowledge Graph (các node tròn nối nhau) ở màn hình Ôn tập.

Task 4.3 (Test): Nhờ bạn bè vào test thử để fix lỗi crash.

Task 4.4 (Doc): Viết báo cáo đồ án, chụp ảnh màn hình, quay video demo.

3. CHI TIẾT TRIỂN KHAI SPRINT 1 (TUẦN ĐẦU TIÊN)

Để bạn bắt tay vào làm ngay, đây là To-do list cho tuần này:

A. Backend (Python/FastAPI hoặc Node.js):

[ ] Init git repo.

[ ] Tạo folder structure: core, modules/question_bank.

[ ] Viết API POST /questions (Lưu câu hỏi JSON vào DB).

[ ] Viết API GET /questions (Lọc theo chương, độ khó).

B. Database:

[ ] Tạo bảng Questions (id, content, options, correct_answer, complexity, chapter_id).

[ ] Tạo bảng KnowledgeNodes (id, name, type) và KnowledgeEdges (source, target, relation).

C. Frontend (React):

[ ] Setup Vite + React + Tailwind.

[ ] Tạo Component Sidebar.

[ ] Code màn hình "Dev Tools -> Thêm câu hỏi":

Có Textarea để paste JSON từ ChatGPT.

Nút "Save" gọi API Backend.

D. Dữ liệu (Quan trọng):

[ ] Dùng ChatGPT sinh 20 câu chương "Đệ quy" và 20 câu chương "Chia để trị" theo format JSON của bạn.

[ ] Nhập vào hệ thống qua tool vừa làm.

4. TIÊU CHÍ HOÀN THÀNH (DEFINITION OF DONE - DoD)

Một tính năng được coi là "Xong" khi:

Code đã được push lên Git.

Chạy không lỗi (No crash).

(Với tính năng AI): Phải có Log in ra console để chứng minh thuật toán đang chạy (Ví dụ: [AI Log] Calculating Heuristic Score: 0.85). -> Cái này cực quan trọng khi demo cho thầy cô.