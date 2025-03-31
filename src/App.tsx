import { AppShell, Burger, createTheme, MantineProvider, PasswordInput } from '@mantine/core';
import './App.css'
import { CustomPasswordInput } from './components/CustomPasswordInput'
import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
import Game2048 from './components/2048';
import { Button } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { Sun, Moon } from 'lucide-react';

function App() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';


  const user1 = {
    name: 'Jan Novák',
    age: 25,
    email: 'jan.novak@example.com',
    isStudent: true,
    address: 'Praha, Česká republika',
    hobbies: ['programování', 'fotbal']
  };

  const user2 = {
    name: 'Anna Dvořáková',
    age: 30,
    email: 'anna.dvorakova@example.com'
  };

  const theme = createTheme({});
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
            <Button 
      onClick={() => setColorScheme(isDark ? 'light' : 'dark')} 
      leftSection={isDark ? <Sun size={16} /> : <Moon size={16} />}
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </Button>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main>
        <Game2048/>
      </AppShell.Main>
    </AppShell>
  );
}

export default App