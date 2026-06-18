# AI Company Framework V3 Core

Một **Operating Framework** giúp biến repository của bạn thành một "AI-Native Software Company" với khả năng tự vận hành, duy trì định hướng (alignment) và chống lại tình trạng mất ngữ cảnh (context decay) của các AI Agents trong dài hạn.

## Triết lý cốt lõi
Framework không phải là một bộ sưu tập prompt hay tài liệu tĩnh. Nó là một hệ điều hành thực thụ dành cho AI. Mọi file đều là một "thực thể sống" có chứa metadata và các **Giao thức Khởi tạo (Initialization Protocols)** để điều khiển hành vi của AI Agent.

## Cách nhúng Framework vào một dự án mới

Để áp dụng AI Company Framework cho bất kỳ dự án nào của bạn (SaaS, Game, Web App...), hãy thực hiện theo 3 bước cực kỳ đơn giản:

### Bước 1: Copy Script khởi tạo
Copy file `init_framework.ps1` từ repository này và dán vào thư mục gốc (root directory) của dự án mới của bạn.

### Bước 2: Chạy Script
Mở terminal/powershell tại thư mục dự án mới và chạy lệnh:
```powershell
powershell -ExecutionPolicy Bypass -File init_framework.ps1
```
Script sẽ tự động sinh ra các thư mục ẩn `.ai-founder`, `.ai-company`, `.ai-runtime`, `.ai-execution` và `reports` cùng các file với trạng thái `UNINITIALIZED`.

### Bước 3: Đánh thức Agent (Wake up the Agent)
Mở dự án bằng trình soạn thảo có AI (như VS Code với Copilot, Cursor, hoặc Gemini IDE), mở cửa sổ Chat và gửi câu lệnh đầu tiên:

> *"Hãy đọc file `.ai-founder/VISION_LOCK.md` và thực hiện AGENT INITIALIZATION PROTOCOL."*

Ngay lập tức, AI Agent sẽ đọc hiểu "luật chơi", nhận ra trạng thái `UNINITIALIZED` và bắt đầu quay sang phỏng vấn bạn (Founder) để lấy thông tin. Sau đó, nó sẽ tự động lan truyền để thiết lập các lớp chiến lược (`.ai-company`) và kiến trúc (`.ai-execution`) cho dự án của bạn!

## Cấu trúc thư mục

- `.ai-founder/`: Nơi chứa "Hiến pháp" và DNA của Founder. AI không được tự ý sửa đổi.
- `.ai-company/`: Lớp Governance. Nơi Agent đóng vai trò C-Level (CTO, Product Manager) lập chiến lược và roadmap.
- `.ai-runtime/`: Hệ thống Bộ nhớ (Memory) & Bàn giao (Handoff). Chứa trạng thái dự án và lý do ra quyết định, giúp các Agent duy trì mạch làm việc không đứt gãy.
- `.ai-execution/`: Phân xưởng Code. Chứa tiêu chuẩn kiến trúc, coding, testing, và deploy.
- `.ai-domains/`: (Tùy chọn) Chứa các plugin kiến thức chuyên ngành (vd: Trading AI, SaaS, v.v.).
- `reports/`: Nơi chứa các biên bản kiểm toán định kỳ (Audits) để phòng chống đi chệch định hướng (Strategic Drift).
