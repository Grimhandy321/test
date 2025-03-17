import { useEffect, useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import { PasswordInput, Progress, Text, Popover, Box } from '@mantine/core';
import { CountryFlagValidator } from './CountryFlagValidator';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const countries = ["AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"];







export function CustomPasswordInput() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');
  const [randomCountri,setRandomCountri] = useState(countries[Math.floor(Math.random() * countries.length)]);

  const requirements: {check: (value: string) => boolean, label:string}[] = [
    {  check: (value : string) =>  /[0-9]/.test(value), label: 'Includes number' },
    {  check: (value : string) =>  /[a-z]/.test(value), label: 'Includes lowercase letter' },
    {  check: (value : string) =>  /[A-Z]/.test(value), label: 'Includes uppercase letter' },
    {  check: (value : string) =>  /[$&+,:;=?@#|'<>.^*()%!-]/.test(value), label: 'Includes special symbol' },
    {  check: (value : string) =>  value.includes(randomCountri), label: 'Includes country code of flag' },
  ];

  function getStrength(password: string) {
    let count = 0
    requirements.forEach((requirement) => {
      if(requirement.check(password)){
          count += 100 / requirements.length 
        }
      }
    );
    return count;
  }

  useEffect(() => {
      document.title = String(strength);
  },[value]);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevPassword) => {
        if (Math.random() > 0.5) {
          return prevPassword + '😜';
        } else {
          if (prevPassword.length > 0) {
            const randomIndex = Math.floor(Math.random() * prevPassword.length);
            return prevPassword.slice(0, randomIndex) + prevPassword.slice(randomIndex + 1);
          }
          return prevPassword;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.check(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            withAsterisk
            label="Your password"
            placeholder="Your password"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
        {checks}
        <CountryFlagValidator code= {randomCountri}/>
      </Popover.Dropdown>
    </Popover>
  );
}