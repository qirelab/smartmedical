# Инструкция по исправлению типа поля phone

## Проблема
Поле `phone` в модели `Patient` имеет тип `Int`, но номера телефонов (например, `79161234567`) не помещаются в 32-битное целое число (INT4). Максимальное значение INT4 - 2,147,483,647.

## Решение
Изменен тип поля `phone` с `Int` на `String` в schema.prisma. Теперь нужно создать миграцию для изменения типа в базе данных.

## Шаги для исправления

### Шаг 1: Создать миграцию
Запустите команду для создания миграции:

```bash
npm run prisma:migrate
```

Или напрямую:
```bash
npx dotenv-cli -e .env -- npx prisma migrate dev --name change_phone_to_string
```

Эта команда:
1. Создаст новую миграцию, которая изменит тип поля `phone` с `INTEGER` на `TEXT`
2. Применит миграцию к базе данных
3. Автоматически регенерирует Prisma Client

### Шаг 2: Проверить миграцию
После создания миграции проверьте файл миграции в `prisma/migrations/[timestamp]_change_phone_to_string/migration.sql`. Он должен содержать что-то вроде:

```sql
-- AlterTable
ALTER TABLE "patients" ALTER COLUMN "phone" TYPE TEXT USING phone::text;
```

### Шаг 3: Регенерировать Prisma Client (если нужно)
Если клиент не регенерировался автоматически:

```bash
npm run prisma:generate
```

### Шаг 4: Запустить seed
Теперь можно запустить seed:

```bash
npm run prisma:seed
```

## Если в базе данных уже есть данные

Если в таблице `patients` уже есть записи с номерами телефонов, миграция автоматически конвертирует их в строки. Однако, если у вас есть очень большие числа, которые не помещались в INT, они могли быть сохранены некорректно.

В таком случае может потребоваться очистить таблицу перед применением миграции:

```sql
TRUNCATE TABLE patients;
```

Или через Prisma:
```typescript
await prisma.patient.deleteMany();
```

## Альтернативный подход (ручная миграция)

Если автоматическая миграция не работает, вы можете создать миграцию вручную:

1. Создайте папку для новой миграции:
```bash
mkdir prisma/migrations/$(date +%Y%m%d%H%M%S)_change_phone_to_string
```

2. Создайте файл `migration.sql` в этой папке:
```sql
-- AlterTable
ALTER TABLE "patients" ALTER COLUMN "phone" TYPE TEXT USING phone::text;
```

3. Примените миграцию:
```bash
npx dotenv-cli -e .env -- npx prisma migrate resolve --applied [timestamp]_change_phone_to_string
```

4. Регенерируйте клиент:
```bash
npm run prisma:generate
```

## Проверка

После применения миграции проверьте структуру таблицы:

```sql
\d patients
```

Поле `phone` должно иметь тип `text`.

Или используйте Prisma Studio:
```bash
npm run prisma:studio
```

## Примечания

- Если миграция не применяется из-за существующих данных, может потребоваться очистить таблицу
- Убедитесь, что база данных доступна и подключение настроено правильно
- После изменения схемы всегда регенерируйте Prisma Client

