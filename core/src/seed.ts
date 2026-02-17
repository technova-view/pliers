import 'reflect-metadata';
import bcrypt from 'bcrypt';
import dataSource from '../data-source';
import { User } from './modules/database/entities/user.entity';

interface SeedOptions {
  clearExisting?: boolean;
  createTables?: boolean;
}

/**
 * Main seed function - creates tables, clears data, and seeds data
 */
async function seed({ clearExisting = true, createTables = true }: SeedOptions = {}): Promise<void> {
  console.log('Starting database seed...\n');

  // Initialize the data source
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
    console.log('✅ Database connection established\n');
  }

  try {
    // Create tables (synchronize entities) if requested
    if (createTables) {
      await dataSource.synchronize(true);
      console.log('✅ Tables created/updated based on schema\n');
    }

    // Clear existing data if requested
    if (clearExisting) {
      console.log('! Clearing existing data...');
      // Get all tables from the database and truncate them
      const tables = await dataSource.query(
        "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
      );
      
      for (const table of tables) {
        await dataSource.query(`TRUNCATE TABLE "${table.tablename}" CASCADE`);
      }
      
      console.log('✅ All existing data cleared\n');
    }

    // Run seeders
    await seedUsers();

    console.log('✅ Seed completed successfully!\n');
  } catch (error) {
    console.error('X Seed failed:', error);
    throw error;
  } finally {
    // Close the connection
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('✅ Database connection closed');
    }
  }
}

/**
 * Fresh seed - creates tables, clears data, and seeds
 */
async function freshSeed(): Promise<void> {
  return seed({ clearExisting: true, createTables: true });
}

/**
 * Regular seed - only seeds data (tables must exist)
 */
async function regularSeed(): Promise<void> {
  return seed({ clearExisting: false, createTables: false });
}

/**
 * Seed users - extensible for adding more users
 */
async function seedUsers(): Promise<void> {
  console.log('Seeding users...');

  const userRepository = dataSource.getRepository(User);

  // Check if user already exists
  const existingUser = await userRepository.findOne({
    where: { email: 'mdmarufbinsalim@gmail.com' }
  });

  if (existingUser) {
    console.log('⚠️  User already exists, skipping...');
    return;
  }

  // Hash password
  const passwordHash = await bcrypt.hash('Pliers789!', 10);
  // Create user
  const user = userRepository.create({
    firstName: 'pliers',
    lastName: '@admin',
    email: 'mdmarufbinsalim@gmail.com',
    passwordHash,
    accountVerified: true,
    provider: 'email',
  });

  await userRepository.save(user);

  console.log('✅ User seeded: test@example.com / Test@123\n');
}

// Export for extensibility
export { seed, freshSeed, regularSeed, seedUsers };

// Run if executed directly
if (require.main === module) {
  const args = process.argv.slice(2);
  const isFresh = args.includes('--fresh') || args.includes(':fresh');
  
  if (isFresh) {
    freshSeed()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  } else {
    regularSeed()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }
}
