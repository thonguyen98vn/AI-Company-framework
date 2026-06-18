Đây là bản tóm tắt cô đọng nhưng đầy đủ về quá trình tiến hóa từ ý tưởng ban đầu đến **AI Company Framework V3 Core**.

# Tên dự án

```text
AI Company Framework
```

Mục tiêu:

```text
Biến một repository thành một AI-Native Software Company
có khả năng:

- tự vận hành
- tự đánh giá
- tự cải tiến
- chống context decay
- chống strategic drift

trong thời gian dài (18-24 tháng+)
với nhiều AI agents khác nhau.
```

---

# Giai đoạn 1 — AI Software Company V2

Ban đầu framework được thiết kế theo mô hình công ty truyền thống:

```text
.ai-company/

00-vision
01-strategy-office
02-user-council
03-product-office
04-cto-office
05-engineering
06-qa-office
07-security-office
08-growth-office
09-research-lab
10-board-room
```

Triết lý:

```text
AI Agent = nhân viên

Office = phòng ban

Governance = công ty
```

Ưu điểm:

```text
- đầy đủ
- dễ hiểu
- giống công ty thật
```

Nhược điểm:

```text
- nhiều file
- thiên về governance
- chưa giải quyết workflow hằng ngày
```

---

# Giai đoạn 2 — Phản biện quan trọng

Một phản biện xuất hiện:

```text
Agent không phải con người.
```

Vấn đề:

Agent mở repo cần biết:

```text
Project đang ở đâu?

Task tiếp theo là gì?

Tôi phải làm gì bây giờ?
```

Trong khi V2 chủ yếu trả lời:

```text
Tại sao làm?

Nên làm gì?
```

Thiếu:

```text
State Management
Execution Flow
Session Context
```

---

# Giai đoạn 3 — Nhận ra 3 Layer

Framework được tái cấu trúc.

## Layer 1

Governance

Trả lời:

```text
Why?
What?
Are we on the right path?
```

---

## Layer 2

Runtime

Trả lời:

```text
Current State
Next Action
Current Sprint
```

---

## Layer 3

Execution

Trả lời:

```text
How?
```

---

Sơ đồ:

```text
Governance
      ↓
Runtime
      ↓
Execution
```

---

# Giai đoạn 4 — Explicit Bridges

Nhận ra:

```text
Layer tồn tại chưa đủ.

Phải có bridges.
```

---

## Bridge A

Governance → Runtime

```text
Product Priorities
        ↓
Current Sprint
```

---

## Bridge B

Runtime → Execution

```text
Tasks
      ↓
Code
```

---

## Bridge C

Execution → Runtime

```text
Code Results
      ↓
Handoff
```

---

## Bridge D

Runtime → Governance

```text
Decisions
      ↓
Board Review
```

---

## Bridge E

Governance Audit Bridge

```text
Board Review
       ↓
Runtime Repair Tasks
```

---

# Giai đoạn 5 — Context Decay

Một phát hiện quan trọng:

Decay không chỉ xảy ra ở Runtime.

---

## Governance Decay

```text
Vision không ai đọc.

Roadmap lỗi thời.
```

---

## Runtime Decay

```text
Project State stale.
```

---

## Execution Decay

```text
Coding Standards bị bỏ qua.
```

---

Khái niệm mới:

```text
Document Lifecycle
```

Mỗi file phải có metadata:

```yaml
owner:
review_cadence:
last_reviewed:
staleness_risk:
```

---

# Giai đoạn 6 — Strategic Decay

Phát hiện nguy hiểm hơn document decay:

```text
Strategic Decay
```

Tức là:

```text
Mọi file đều mới.

Mọi báo cáo đều xanh.

Nhưng sản phẩm vẫn đi sai hướng.
```

Đây trở thành bài toán trung tâm của framework.

---

# Giai đoạn 7 — CONTEXT_HEALTH

Thay vì một score duy nhất.

Framework dùng:

## Freshness Score

```text
Tài liệu còn mới không?
```

---

## Alignment Score

```text
Có còn bám Vision không?
```

---

## Confidence Score

```text
Agent chắc chắn tới mức nào?
```

---

Ngoài ra:

```text
Agent Assessment
+
Telemetry
+
Board Audit
```

cùng tham gia đánh giá.

---

# Giai đoạn 8 — Drift Budget

Khái niệm mới:

```text
Drift Budget
```

Ví dụ:

```text
Vision Drift Budget = 20

Current Drift = 14
```

Mỗi quyết định trái founder directives:

```text
+1
+2
+3 drift
```

Nếu vượt ngưỡng:

```text
Founder Review Required
```

---

# Giai đoạn 9 — Layer Founder

Thêm layer cao nhất:

```text
.ai-founder/
```

---

Bao gồm:

```text
VISION_LOCK.md

NON_NEGOTIABLES.md

INVESTMENT_THESES.md
```

---

Vai trò:

```text
Founder DNA

Không được vi phạm.
```

---

# Giai đoạn 10 — Domain Plugin

Một phát hiện rất quan trọng:

Framework không nên gắn với domain.

---

Framework:

```text
AI Company Framework
```

---

Domain:

```text
Trading AI
Club Management
SaaS
E-Commerce
Content Platform
```

---

Kết luận:

```text
Framework sống lâu hơn domain.

Domain là plugin.
```

---

# Giai đoạn 11 — V3 Core

Kiến trúc cuối cùng được chốt.

```text
.ai-founder/

.ai-company/

.ai-runtime/

.ai-execution/

.ai-domains/

reports/
```

---

## .ai-founder

```text
VISION_LOCK

NON_NEGOTIABLES

INVESTMENT_THESES
```

---

## .ai-company

```text
vision

strategy

user-council

product-office

cto-office

board-room
```

---

## .ai-runtime

```text
PROJECT_STATE

CURRENT_SPRINT

NEXT_ACTIONS

DECISIONS

BLOCKERS

HANDOFF

CONTEXT_HEALTH
```

---

## .ai-execution

```text
ARCHITECTURE

CODING_STANDARDS

TESTING_STANDARDS

DEPLOYMENT

STACK_GUIDE
```

---

## .ai-domains

```text
trading-ai

club-management

saas
```

---

## reports

```text
board-review

technical-debt

maturity-score

drift-ledger

recovery-plan
```

---

# Giai đoạn 12 — Tránh Overengineering

Một cảnh báo cuối cùng:

Chúng ta bắt đầu tiến tới:

```text
Event System

State Graph

Workflow Engine

Governance Engine
```

Nhưng quyết định cuối cùng:

```text
KHÔNG BUILD NGAY.
```

Lý do:

```text
Framework đang scale nhanh hơn nhu cầu thực tế.
```

---

# Quyết định cuối cùng

Track A:

```text
Build Now
```

Xây dựng:

```text
AI Company Framework V3 Core
```

với khoảng:

```text
20-25 files
```

---

Track B:

```text
Future OS Spec
```

Ghi nhận ý tưởng:

```text
Events
State Graph
Agent Registry
Workflow Engine
```

trong:

```text
docs/AI_COMPANY_OS_V4_SPEC.md
```

---

# Triết lý cuối cùng

```text
AI Company Framework
không phải là:

- Documentation System
- Prompt Collection
- Governance Simulator

mà là:

Một Operating Framework

giúp AI Agents và Founder
duy trì alignment dài hạn,
tránh context decay,
tránh strategic decay,
và biến chiến lược thành hành động,
hành động thành học hỏi.
```
