# Hướng Dẫn: Áp dụng AI Company Framework vào dự án ĐANG DỞ DANG

Nếu bạn nhận được framework này (dưới dạng file ZIP) và muốn nhúng nó vào một dự án **đang code dở dang** (đã có sẵn source code, kiến trúc, database...), hãy làm theo các bước sau.

Sự khác biệt lớn nhất giữa dự án mới và dự án dở dang là: AI Agent cần phải "Reverse-engineer" (hiểu ngược) những gì bạn đã làm để đưa vào Framework.

---

### Bước 1: Giải nén và Nhúng Framework
1. Giải nén file ZIP bạn nhận được.
2. Copy file `init_framework.ps1` và ném thẳng vào thư mục gốc (root directory) của dự án dở dang của bạn.
3. Mở terminal/powershell tại dự án đó và chạy lệnh:
   ```powershell
   powershell -ExecutionPolicy Bypass -File init_framework.ps1
   ```
   *Lệnh này sẽ KHÔNG ghi đè code hiện tại của bạn, nó chỉ tạo thêm các thư mục ẩn `.ai-founder`, `.ai-company`, `.ai-runtime`, `.ai-execution`...*

---

### Bước 2: "Bắt mạch" dự án (Catch-up Protocol)
Mở dự án bằng AI IDE (Cursor, VS Code Copilot, v.v.). Lúc này hệ thống đang ở trạng thái `UNINITIALIZED`.

Thay vì chỉ trả lời câu hỏi đơn thuần, hãy gửi cho AI câu lệnh sau:

> *"Tôi vừa cài đặt AI Company Framework. Đây là một dự án đã có sẵn code. Hãy quét qua toàn bộ cấu trúc thư mục và mã nguồn hiện tại của tôi để hiểu bối cảnh. Sau đó, hãy tiến hành AGENT INITIALIZATION PROTOCOL ở file `.ai-founder/VISION_LOCK.md`. Dựa trên code bạn vừa đọc, hãy gợi ý cho tôi Sứ mệnh và Khách hàng mục tiêu để tôi chốt."*

Lúc này, AI sẽ đọc code cũ của bạn và tự động phác thảo tầm nhìn sát với thực tế nhất để bạn duyệt.

---

### Bước 3: Dịch ngược Kiến trúc (Reverse-Engineering)
Sau khi thiết lập xong DNA của Founder, hãy yêu cầu AI cập nhật Lớp Phân Xưởng (Execution Layer):

> *"Hãy vào file `.ai-execution/ARCHITECTURE.md`. Đừng đề xuất Tech Stack mới, hãy phân tích code hiện tại và ghi lại Tech Stack, Database, và Cấu trúc thư mục mà tôi ĐANG sử dụng vào đó. Sau đó đổi trạng thái thành `INITIALIZED`."*

Bước này giúp AI không tự tiện đề xuất công nghệ ảo tưởng, mà sẽ tuân thủ đúng những gì dự án dở dang đang dùng.

---

### Bước 4: Chuyển đổi công việc sang Runtime Layer
Đây là bước quyết định để bạn điều hành dự án bằng Framework:

1. **Gom Task:** Gửi cho AI danh sách các bug, tính năng đang làm dở (có thể lấy từ Jira, Trello hoặc trí nhớ của bạn).
2. **Yêu cầu:** *"Hãy cập nhật tất cả những việc đang làm dở này vào `.ai-runtime/PROJECT_STATE.md` và chọn ra 3 việc quan trọng nhất đưa vào `.ai-runtime/CURRENT_SPRINT.md`."*

---

### Bước 5: Vận hành hàng ngày
Từ thời điểm này, dự án dở dang của bạn đã chính thức được "số hóa" vào AI Company Framework. 

Mỗi buổi sáng mở máy lên, bạn chỉ cần mở file `.ai-runtime/HANDOFF.md` và gõ:
> *"Tôi muốn tiếp tục làm việc. Hôm qua chúng ta dừng ở đâu và tác vụ tiếp theo là gì?"*

Framework sẽ tự động giữ luồng công việc của bạn xuyên suốt từ ngày này qua tháng nọ mà không bao giờ bị lạc lối!
