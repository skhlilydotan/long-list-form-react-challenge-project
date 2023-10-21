import {Autocomplete, TextField} from "@mui/material";
import countries from './../data/countries.json'
import {styled} from "@mui/material/styles";

const StyledAutocompleteField = styled(Autocomplete)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
  height: '40px'
});

const countriesOptions = countries.map((country, index) => {
  return {label: country, id: index}
});
const AutocompleteField = ({value, dirty, setDirty, name, onChangehandler}) => {
  return <>
    <StyledAutocompleteField
        name={name}
        value={value}
        onChange={(e) => {
          onChangehandler('country', e.target.value);
          setDirty(true);
        }}
        options={countries}
        renderInput={(params) => <TextField color="primary" {...params} label="Country" />}
    /></>;
};

AutocompleteField.defaultProps = {
  name: 'text_field_name',
  value: '',
  onChangehandler: () => {},
  setDirty: () => {},
  dirty: false,
};
export default AutocompleteField;


/**/