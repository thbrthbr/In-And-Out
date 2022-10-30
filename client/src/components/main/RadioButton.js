import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export default function RadioButton({
  legend,
  buttonOptions,
  checkedOption,
  buttonName,
  labelPlacement,
  handleChange,
}) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{legend}</FormLabel>
      <RadioGroup aria-label="position">
        {buttonOptions.map((option, idx) => (
          <FormControlLabel
            key={idx}
            checked={checkedOption === option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            name={buttonName}
            labelPlacement={labelPlacement}
            onChange={handleChange}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
