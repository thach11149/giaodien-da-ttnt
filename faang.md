KIẾN TRÚC MODULAR & DESIGN PATTERNS (Áp dụng tư duy FAANG)

Mục tiêu: Xây dựng hệ thống dễ mở rộng (Extensible), dễ bảo trì (Maintainable) và tách biệt rõ ràng giữa logic phần mềm thường và logic AI.

1. KIẾN TRÚC TỔNG THỂ: MODULAR MONOLITH

Thay vì chia layer theo kỹ thuật (Controller, Service, Repository), chúng ta chia theo Nghiệp vụ (Domain Driven Design - DDD). Mỗi thư mục là một "Plugin" thu nhỏ.

Cấu trúc thư mục đề xuất (Backend - Python/Nodejs):

/src
  /core                 # Các thành phần dùng chung (Database, Logger, Base Classes)
  
  /modules              # Nơi chứa các "Plugin" tính năng
    /auth               # Quản lý đăng nhập
    /question_bank      # Quản lý CRUD câu hỏi
    
    /exam_creator       # [AI MODULE] Module Tạo đề
      /strategies       # Chứa các thuật toán sinh đề (Random, AI Adaptive,...)
      /services
      
    /evaluator          # [AI MODULE] Module Đánh giá
      /analyzers        # Các bộ phân tích lỗi sai
      
    /smart_tutor        # [FUTURE MODULE] Trợ giảng ảo (Chỉ cần tạo folder này sau)


Tại sao cách này giống FAANG?

Isolation (Cô lập): Nếu module exam_creator bị lỗi, module question_bank vẫn hoạt động bình thường.

Scalability (Mở rộng): Khi muốn thêm tính năng "Đấu trường", bạn chỉ cần tạo thư mục /modules/arena mà không cần sửa code của các module khác.

2. ÁP DỤNG DESIGN PATTERNS VÀO AI ENGINE

Đây là phần bạn sẽ trình bày trong báo cáo để chứng minh chiều sâu kỹ thuật.

A. STRATEGY PATTERN (Mẫu Chiến lược) - Áp dụng cho sinh đề

Bài toán: Hôm nay bạn dùng thuật toán "Random", ngày mai bạn muốn dùng "Heuristic", ngày kia bạn muốn dùng "Gemini AI". Bạn không thể viết if-else mãi được.
Giải pháp: Định nghĩa một Interface chung.

# Interface chung (Abstract Class)
class ExamGenerationStrategy:
    def generate(self, params): pass

# Chiến lược 1: Random (Cách truyền thống)
class RandomStrategy(ExamGenerationStrategy):
    def generate(self, params):
        return db.query("SELECT * FROM questions ORDER BY RANDOM()")

# Chiến lược 2: AI Adaptive (Cách thông minh - Đồ án của bạn)
class AIAdaptiveStrategy(ExamGenerationStrategy):
    def generate(self, params):
        # 1. Lấy profile người dùng
        # 2. Chạy thuật toán Leo đồi (Hill Climbing) để tìm tập câu hỏi tối ưu
        return optimized_questions

# Context: Nơi sử dụng
class ExamService:
    def create_exam(self, strategy_type):
        if strategy_type == "AI":
            strategy = AIAdaptiveStrategy()
        else:
            strategy = RandomStrategy()
        return strategy.generate()


Lợi ích: Bạn có thể demo cho thầy cô thấy việc chuyển đổi giữa "Tạo đề thường" và "Tạo đề AI" chỉ bằng một nút bấm cấu hình (Feature Flag).

B. FACTORY PATTERN (Mẫu Nhà máy) - Áp dụng cho Prompting

Bài toán: Tạo prompt cho Gemini sinh câu hỏi "Lý thuyết" khác với prompt sinh câu hỏi "Bài tập code".
Giải pháp: Dùng Factory để sản xuất Prompt.

class PromptFactory:
    @staticmethod
    def create_prompt(question_type, topic):
        if question_type == "CONCEPT":
            return f"Hãy đóng vai GS. Tạo câu hỏi lý thuyết về {topic}..."
        elif question_type == "CODING":
            return f"Hãy tạo bài tập lập trình C++ về {topic}, kèm test case..."


C. OBSERVER PATTERN (Mẫu Người quan sát) - Áp dụng cho Analytics

Bài toán: Khi sinh viên Nộp bài, hệ thống cần làm nhiều việc: (1) Tính điểm, (2) Cập nhật biểu đồ Radar, (3) Gửi thông báo cho Mentor AI.
Giải pháp: Sự kiện ExamSubmitted kích hoạt các observers.

Subject: ExamSubmissionService

Observers:

ScoringService: Tính điểm số.

KnowledgeGraphUpdater: Cập nhật node xanh/đỏ trên cây tri thức.

MentorNotifier: Kích hoạt AI Mentor phân tích bài làm.

3. FRONTEND COMPONENTS (REACT) - DẠNG "PLUGIN"

Ở Frontend, bạn thiết kế theo tư duy Atomic Design để tái sử dụng.

Cấu trúc Component thông minh:

Dumb Components (UI thuần): Button, QuestionCard, RadarChart. (Chỉ hiển thị, không có logic).

Smart Components (Logic): ExamContainer, ReviewDashboard. (Kết nối API, xử lý dữ liệu).

Dynamic Component Loading (Nâng cao):

Để hỗ trợ các loại câu hỏi mới trong tương lai mà không cần sửa core, bạn dùng map:

const QuestionRenderers = {
  'multiple_choice': MultipleChoiceComponent,
  'fill_in_blank': FillBlankComponent,
  'code_editor': CodeEditorComponent, // Sau này thêm loại bài tập code
  'drag_drop': DragDropComponent      // Sau này thêm loại kéo thả
};

function QuestionItem({ data }) {
  const Component = QuestionRenderers[data.type];
  return <Component content={data.content} />;
}


Lợi ích: Khi bạn muốn thêm dạng bài tập mới (ví dụ: Kéo thả), bạn chỉ cần tạo DragDropComponent và đăng ký vào map QuestionRenderers. Code cũ không bị ảnh hưởng.

4. QUY TRÌNH PHÁT TRIỂN TÍNH NĂNG (WORKFLOW)

Để làm việc chuyên nghiệp như dev FAANG, hãy tuân thủ quy trình:

Define Interface: Định nghĩa Input/Output của tính năng trước (VD: API tạo đề cần nhận vào subject_id, difficulty, trả về JSON list câu hỏi).

Mock Data: Tạo dữ liệu giả để làm Frontend trước khi Backend xong.

Implement Plugin: Viết logic vào module tương ứng.

Integration: Ghép nối và test.

5. TỔNG KẾT

Với cách tổ chức này, đồ án của bạn sẽ:

Gọn gàng: Code không bị "Spaghetti" (rối rắm).

Chuyên nghiệp: Thể hiện bạn hiểu về kiến trúc phần mềm.

Linh hoạt: Dễ dàng chứng minh sự khác biệt giữa "Logic thường" và "Logic AI" bằng cách tráo đổi các Strategy/Module.