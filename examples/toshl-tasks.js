// Пример создания задачи для тестирования MCP интеграции с Toshl Finance
// Этот файл можно использовать как справочник для создания задач через TaskQueue UI

const exampleTasks = [
  {
    title: "Месячная сводка расходов",
    exeType: "toshl_mcp_finance",
    payload: {
      operation: "get-expenses-summary",
      period: "month"
    },
    priority: 5,
    queue: "default"
  },
  {
    title: "Последние 10 транзакций",
    exeType: "toshl_mcp_finance", 
    payload: {
      operation: "get-recent-transactions",
      limit: 10
    },
    priority: 3,
    queue: "default"
  },
  {
    title: "Статус бюджета",
    exeType: "toshl_mcp_finance",
    payload: {
      operation: "get-budget-status"
    },
    priority: 4,
    queue: "default"
  }
];

// Для создания задачи через TaskQueue UI:
// 1. Откройте http://localhost:3000
// 2. Нажмите "Add Task"
// 3. Заполните поля:
//    - Title: название задачи
//    - Execution Type: toshl_mcp_finance
//    - Payload: скопируйте JSON из поля payload выше
//    - Priority: установите приоритет
//    - Queue: выберите очередь

export default exampleTasks;
