import { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface DaySelectProps {
  handleUpdate: (chosenDays: string[]) => void;
}

const DaySelect: React.FC<DaySelectProps> = ({ handleUpdate }) => {
  const [daysToggle, setDaysToggle] = useState<Record<string, boolean>>({
    mon: false,
    tues: false,
    wed: false,
    thurs: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const [chosenDays, setChosenDays] = useState<string[]>([]);

  const updateToggle = (day: string) => {
    const prevState: boolean = daysToggle[day];
    setDaysToggle({
      ...daysToggle,
      [day]: !prevState,
    });
    const daysList = chosenDays;
    if (!prevState) {
      daysList.push(day);
    }
    setChosenDays(daysList);
    handleUpdate(daysList);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={daysToggle.mon} onChange={() => updateToggle('mon')} />}
        label="Mon"
      />
      <FormControlLabel
        control={<Checkbox checked={daysToggle.tues} onChange={() => updateToggle('tues')} />}
        label="Tues"
      />
      <FormControlLabel
        control={<Checkbox checked={daysToggle.wed} onChange={() => updateToggle('wed')} />}
        label="Wed"
      />
      <FormControlLabel
        control={<Checkbox checked={daysToggle.thurs} onChange={() => updateToggle('thurs')} />}
        label="Thurs"
      />
      <FormControlLabel
        control={<Checkbox checked={daysToggle.fri} onChange={() => updateToggle('fri')} />}
        label="Fri"
      />
      <FormControlLabel
        control={<Checkbox checked={daysToggle.sat} onChange={() => updateToggle('sat')} />}
        label="Sat"
      />
      <FormControlLabel
        control={<Checkbox checked={daysToggle.sun} onChange={() => updateToggle('sun')} />}
        label="Sun"
      />
    </FormGroup>
  );
};

export default DaySelect;
