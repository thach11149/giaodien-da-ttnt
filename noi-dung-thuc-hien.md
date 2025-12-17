THIẾT KẾ GIAO DIỆN NGƯỜI DÙNG (STUDENT UX/UI)
Hệ thống Trắc nghiệm & Đánh giá Năng lực Môn Phân tích Thiết kế Thuật toán
1. BỐ CỤC TỔNG THỂ (GLOBAL LAYOUT)
Giao diện sử dụng bố cục Dashboard 2 cột:
Sidebar (Trái - Cố định): Chứa Menu điều hướng.
Main Content (Phải - Thay đổi): Khu vực tương tác chính.
Màu sắc chủ đạo: Xanh Dương đậm (Trust) kết hợp với Tím Gradient (AI Intelligence).
2. CHI TIẾT SIDEBAR (MENU ĐIỀU HƯỚNG)
Thanh điều hướng bên trái bao gồm các mục chính:
NHÓM TÍNH NĂNG CỐT LÕI (CORE FEATURES):
Ôn tập (Review)
Đề thi (Exam Creator)
Lịch sử làm bài (History & Feedback)
Đánh giá năng lực (Analytics)
NHÓM TÍNH NĂNG MỞ RỘNG (FUTURE EXPANSION):
Trợ giảng ảo (AI Tutor) (Update Later)
Đấu trường (Arena) (Update Later)
Lộ trình thông minh (Smart Planner) (Update Later)
NHÓM CÔNG CỤ PHÁT TRIỂN (DEV TOOLS - TẠM THỜI):
Kho câu hỏi (Question Bank) (Dùng để debug & thống kê)
Thêm câu hỏi (Quick Add) (Hỗ trợ Prompting)
3. CHI TIẾT TỪNG MÀN HÌNH (CORE FEATURES)
MÀN HÌNH 1: ĐỀ THI (EXAM CREATOR) - "THE CREATOR"
Đây là nơi thể hiện thuật toán Tìm kiếm Heuristic & CSP (Constraint Satisfaction Problem).
A. Khu vực Cấu hình Đề thi:
Khối 1: Phạm vi Kiến thức (Scope)
Chọn Chương: Dropdown list (CS112).
Chọn Bài học: Dropdown list (Load động).
(💡 Điểm nhấn AI) Gợi ý thông minh: Bên cạnh dropdown có dòng nhỏ: "Hệ thống phát hiện bạn đang yếu chương 3, đề xuất chọn chương này."
Khối 2: Phân loại Kiến thức (Knowledge Taxonomy)
Label: "Bạn muốn tập trung vào loại kiến thức nào?"
Checkboxes (Đa chọn):
$$ $$
Khái niệm (Lý thuyết cơ bản, định nghĩa)
$$ $$
Định lý (Phát biểu, điều kiện áp dụng - VD: Master Theorem)
$$ $$
Tính chất (Đặc điểm, ưu nhược điểm thuật toán)
$$ $$
Dạng bài tập (Tính toán độ phức tạp, chạy tay)
Khối 3: Thông số Đề thi (Parameters)
Số lượng câu hỏi: Slider (10 - 50 câu).
Độ khó (AI Logic):
Option 1: Chỉnh tay (Cơ bản - Vận dụng - Nâng cao).
(💡 Điểm nhấn AI) Option 2: "AI Adaptive" (Tự động thích nghi). Giải thích: Hệ thống tự động điều chỉnh độ khó dựa trên năng lực hiện tại của bạn (Thuật toán Leo đồi).
Thời gian làm bài: Input (phút).
Nút hành động:
Button: "TẠO ĐỀ THI VỚI AI" ✨.
Hiệu ứng Loading (Rất quan trọng): Thay vì quay tròn, hiện các dòng text chạy nhanh:
"Đang truy xuất Knowledge Graph..."
"Đang thỏa mãn ràng buộc (CSP)..."
"Đang tối ưu hóa độ khó (Heuristic)..."
-> Điều này chứng minh quy trình xử lý của AI.
B. Giao diện Làm bài:
Hiển thị câu hỏi dạng thẻ.
(💡 Điểm nhấn AI) Nút "Gợi ý ngữ nghĩa" (Semantic Hint): Không hiện đáp án, mà hiện node kiến thức liên quan (VD: "Gợi ý: Hãy xem lại điều kiện a > b^k của Định lý Master").
MÀN HÌNH 2: ÔN TẬP (REVIEW MODE)
Nơi thể hiện Biểu diễn tri thức (Knowledge Representation) - Chương 3 CS106.
Chế độ xem:
Dạng Danh sách: Như bình thường.
(💡 Điểm nhấn AI) Dạng Đồ thị (Knowledge Graph View):
Visual: Hiển thị các bài học dưới dạng các hình tròn (Nodes) nối với nhau bằng các đường (Edges).
Tương tác:
Hover vào node "QuickSort" -> Sáng đường nối tới node "Chia để trị" (Quan hệ IS-A).
Hover vào node "Master Theorem" -> Sáng đường nối tới "Đệ quy" (Quan hệ REQUIRES).
Màu sắc: Node Xanh (Đã thạo) - Node Đỏ (Đang hổng kiến thức).
Tác dụng: Giúp sinh viên thấy bức tranh toàn cảnh và mối quan hệ ngữ nghĩa.
Tính năng: Flashcard & Quick Quiz.
MÀN HÌNH 3: LỊCH SỬ LÀM BÀI (HISTORY)
Đáp ứng yêu cầu đánh giá "Thông qua một bài kiểm tra" & Chương 3 (Hệ chuyên gia).
A. Danh sách lịch sử: Bảng thống kê cơ bản.
B. Chi tiết Lượt làm bài (Single Exam Assessment):
Thông tin chung: Điểm số, Thời gian.
Chi tiết đáp án & Giải thích:
Câu hỏi - Đáp án chọn - Đáp án đúng.
AI Explanation: Giải thích tại sao đúng/sai dựa trên logic.
(💡 Điểm nhấn AI) Chẩn đoán Lỗi (Error Diagnosis):
Thay vì chỉ nói "Sai", AI phân loại lỗi dựa trên suy diễn:
⚠️ Lỗi Kiến thức: Hổng kiến thức nền (Hệ thống phát hiện bạn sai chuỗi câu hỏi liên quan).
⚠️ Lỗi Tính toán: Hiểu phương pháp nhưng tính sai kết quả.
⚠️ Lỗi Logic: Chọn nhầm thuật toán (VD: Dùng Tham lam cho bài toán cần Quy hoạch động).
MÀN HÌNH 4: ĐÁNH GIÁ (ANALYTICS) - "THE MENTOR"
Đáp ứng yêu cầu đánh giá "Thông qua nhiều bài kiểm tra" & Chương 4 (Học máy).
A. Biểu đồ Radar Kiến thức (Knowledge Radar):
4 Đỉnh: Khái niệm - Định lý - Tính chất - Dạng bài tập.
Tác dụng: Nhìn vào thấy ngay vùng lõm năng lực.
B. Biểu đồ Tiến bộ & Dự báo (Forecast):
Đường liền: Điểm thực tế quá khứ.
(💡 Điểm nhấn AI) Đường nét đứt: Dự báo điểm tương lai. (VD: "Với đà này, bạn sẽ đạt 8.5 điểm cuối kỳ").
Label nhỏ: "Dự báo bởi Linear Regression Model".
C. Lời khuyên tổng hợp (AI Assessment):
Đoạn văn tự động sinh (NLG): "Chào$$Tên$$
, qua 5 bài test, bạn nắm rất vững Khái niệm và Tính chất (Đúng >90%). Tuy nhiên, phần Dạng bài tập về tính độ phức tạp Đệ quy đang là điểm yếu lớn nhất. Bạn cần luyện tập thêm chương 2 ngay."
4. CHI TIẾT TÍNH NĂNG CÔNG CỤ PHÁT TRIỂN (DEV TOOLS)
Các tính năng này giúp kiểm soát chất lượng dữ liệu và hỗ trợ sinh câu hỏi bán tự động.
MENU 8: KHO CÂU HỎI (QUESTION BANK)
Mục đích: Debug hiển thị và Thống kê độ phủ kiến thức.
A. Thống kê Ma trận (Coverage Matrix):
Giao diện: Một bảng Heatmap (Bản đồ nhiệt).
Dòng: Các Chương/Bài học (Chương 1, 2, 3...).
Cột: Các Loại kiến thức (Khái niệm, Định lý, Tính chất, Dạng bài).
Ô dữ liệu: Hiển thị số lượng câu hỏi hiện có.
Màu đỏ: < 5 câu (Thiếu dữ liệu -> Cần bổ sung gấp).
Màu vàng: 5-10 câu.
Màu xanh: > 10 câu (Đủ dữ liệu).
Tác dụng: Giúp bạn nhìn vào là biết ngay chương nào đang bị "trắng" câu hỏi để ưu tiên tạo thêm.
B. Danh sách Chi tiết (Debug View):
Hiển thị: Dạng thẻ (Card) hoặc Bảng, show toàn bộ nội dung câu hỏi.
Tính năng kiểm tra:
Render LaTeX: Kiểm tra các công thức toán ($O(n^2)$) có bị lỗi font không.
Highlight Code: Kiểm tra các đoạn code C++ có được tô màu cú pháp đúng không.
Bộ lọc: Lọc theo Tag (VD: Xem tất cả câu "Định lý Master" mức "Vận dụng").
MENU 9: THÊM CÂU HỎI (QUICK ADD)
Mục đích: Tool hỗ trợ "Prompt Engineering" để sinh dữ liệu thủ công.
A. Cấu hình Prompt (Input):
Người dùng chọn các thông số từ Dropdown:
Chương: [Chương 2: Phân tích Đệ quy]
Chủ đề: [Phương pháp đoán nghiệm]
Loại câu: [Bài tập tính toán]
Độ khó: [Khó]
B. Khu vực Sinh Prompt (Prompt Generator):
Hệ thống tự động điền các thông số trên vào một Template Prompt chuẩn:Template: "Hãy đóng vai giảng viên ĐH. Tạo 1 câu hỏi trắc nghiệm bộ môn [Phân tích thuật toán] về chủ đề [Đoán nghiệm]. Yêu cầu: Dạng [Bài tập], Mức độ [Khó]. Định dạng Output: JSON kèm giải thích chi tiết."
Nút bấm: [COPY PROMPT] 📋.
C. Khu vực Nhập liệu (Manual Input):
Sau khi user paste prompt vào ChatGPT/Gemini và có kết quả, họ copy kết quả paste lại vào form nhập liệu thủ công của hệ thống để lưu vào database.
5. CHI TIẾT TÍNH NĂNG MỞ RỘNG (FUTURE EXPANSION)
Các tính năng này được liệt kê để thể hiện tầm nhìn và lộ trình phát triển nâng cao của đề tài.
MENU 5: TRỢ GIẢNG ẢO (AI TUTOR) - (Update Later)
Nội dung cần phát triển:
Chatbot hỏi đáp: Sinh viên có thể chat trực tiếp: "Giải thích lại bước Partition trong QuickSort cho tôi".
Giải bài tập mẫu: Sinh viên nhập đề bài, AI Tutor hướng dẫn giải từng bước (Step-by-step) chứ không chỉ đưa đáp án.
Kiến thức AI áp dụng:
Xử lý ngôn ngữ tự nhiên (NLP): Để hiểu câu hỏi của sinh viên.
Generative AI & RAG: Để sinh câu trả lời dựa trên giáo trình CS112 (tránh bịa đặt kiến thức).
MENU 6: ĐẤU TRƯỜNG (ARENA) - (Update Later)
Nội dung cần phát triển:
Thách đấu 1vs1: Hai sinh viên cùng làm một bộ đề trong thời gian thực.
Đấu với Bot: Sinh viên thi đấu với AI Bot có các cấp độ khó khác nhau (Easy/Medium/Hard).
Kiến thức AI áp dụng:
Lý thuyết trò chơi (Game Theory - Chương 4): Xây dựng chiến thuật cho Bot (VD: Bot biết chọn chiến thuật chặn điểm người chơi).
Hệ thống ghép cặp (Matchmaking): Sử dụng xác suất Bayes để ghép 2 người chơi có cùng trình độ (như hệ thống ELO).
MENU 7: LỘ TRÌNH THÔNG MINH (SMART PLANNER) - (Update Later)
Nội dung cần phát triển:
Lập lịch học tự động: Dựa trên ngày thi cuối kỳ (ví dụ: còn 2 tuần), hệ thống tự sinh ra một thời gian biểu chi tiết: "Thứ 2: Ôn Đệ quy (2h)", "Thứ 4: Làm bài tập Quy hoạch động".
Kiến thức AI áp dụng:
Lập kế hoạch tự động (Automated Planning): Coi việc ôn thi là một bài toán lập kế hoạch với trạng thái khởi đầu là "Kiến thức hiện tại" và trạng thái đích là "Đạt điểm 8.0". AI tìm chuỗi hành động tối ưu để đi từ đích này sang đích kia.
6. BẢN ĐỒ ÁNH XẠ KIẾN THỨC (Dùng để trả lời phản biện)
Khi bảo vệ đồ án, hãy dùng bảng này để chứng minh sự "Xuất sắc" và khác biệt.
Tính năng trên Giao diện
Thuật ngữ/Kiến thức AI (CS106) tương ứng
Tại sao khác biệt với App thường?
Nút "Tạo đề AI Adaptive"
Bài toán thỏa mãn ràng buộc (CSP) & Tìm kiếm Heuristic (Chương 2)
App thường chỉ random câu hỏi. App này "tìm kiếm" tổ hợp câu hỏi tối ưu nhất cho người dùng.
Giao diện "Knowledge Graph"
Mạng ngữ nghĩa (Semantic Network) (Chương 3)
App thường hiển thị danh sách phẳng (List). App này hiển thị mối quan hệ giữa các kiến thức.
Mục "Chẩn đoán lỗi"
Hệ luật dẫn & Suy diễn lùi (Backward Chaining) (Chương 3)
App thường chỉ báo sai. App này suy luận ngược để tìm ra "tại sao sai" (nguyên nhân gốc rễ).
Biểu đồ "Dự báo điểm"
Học máy & Lập luận gần đúng (Chương 4)
App thường chỉ hiện quá khứ. App này dùng dữ liệu để dự đoán tương lai.
Lời khuyên tổng hợp
Xử lý ngôn ngữ tự nhiên (NLP/NLG)
App thường dùng câu mẫu cứng nhắc. App này sinh văn bản tự nhiên như giáo viên thật.
Trợ giảng ảo (Future)
NLP & Generative AI
Tương tác hội thoại thay vì chỉ click chuột.
Đấu trường (Future)
Game Theory (Chương 4)
Ứng dụng AI vào môi trường cạnh tranh (Multi-agent).
Kho câu hỏi (Dev Tool)
Data Quality Assurance
Công cụ kiểm soát chất lượng dữ liệu để đảm bảo AI học đúng.


