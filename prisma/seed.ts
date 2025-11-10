import { PrismaClient } from '../src/generated/prisma/client'

const prisma = new PrismaClient()

interface PatientData {
  login: string
  email: string
  password: string
  name: string
  phone: string
  registration_date: Date
}

async function main(): Promise<void> {
  console.log('Начинаем заполнение тестовыми данными...')

  // Очищаем существующие данные (опционально)
  await prisma.patient.deleteMany()

  // Тестовые данные пациентов
  const patientsData: PatientData[] = [
    {
      login: 'ivanov_patient',
      email: 'ivanov@example.com',
      password: '$2b$10$hashed_password_123', // В реальном приложении используйте bcrypt!
      name: 'Иванов Иван Иванович',
      phone: '79161234567',
      registration_date: new Date('2024-01-15')
    },
    {
      login: 'petrova_maria',
      email: 'petrova@example.com',
      password: '$2b$10$hashed_password_456',
      name: 'Петрова Мария Сергеевна',
      phone: '79169876543',
      registration_date: new Date('2024-02-20')
    },
    {
      login: 'sidorov_alex',
      email: 'sidorov@example.com',
      password: '$2b$10$hashed_password_789',
      name: 'Сидоров Алексей Владимирович',
      phone: '79165554433',
      registration_date: new Date('2024-03-10')
    },
    {
      login: 'smirnova_olga',
      email: 'smirnova@example.com',
      password: '$2b$10$hashed_password_012',
      name: 'Смирнова Ольга Дмитриевна',
      phone: '79167778899',
      registration_date: new Date('2024-01-28')
    },
    {
      login: 'kozlov_dmitry',
      email: 'kozlov@example.com',
      password: '$2b$10$hashed_password_345',
      name: 'Козлов Дмитрий Петрович',
      phone: '79163332211',
      registration_date: new Date('2024-02-05')
    }
  ]

  try {
    // Создаем пациентов по одному для лучшей обработки ошибок
    const createdPatients = []
    for (const patientData of patientsData) {
      try {
        const patient = await prisma.patient.create({
          data: patientData,
        })
        createdPatients.push(patient)
      } catch (error: any) {
        // Пропускаем дубликаты
        if (error.code === 'P2002') {
          console.log(`Пациент ${patientData.login} уже существует, пропускаем`)
        } else {
          throw error
        }
      }
    }

    console.log(`Создано ${createdPatients.length} пациентов`)

    // Проверяем созданные данные
    const allPatients = await prisma.patient.findMany({
      orderBy: {
        registration_date: 'desc'
      }
    })
    
    console.log('Все пациенты в базе:')
    allPatients.forEach((patient) => {
      console.log(`- ${patient.name} (${patient.email}) - ${patient.registration_date.toISOString().split('T')[0]}`)
    })
  } catch (error) {
    console.error('Ошибка при создании пациентов:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })