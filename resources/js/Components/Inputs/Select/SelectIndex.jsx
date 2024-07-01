import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 },
  },
};

class SelectIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: props.value || '', // Initialize choices with props.value or empty string
    };
  }

  // Handle change event
  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ choices: value }); // Update local state with selected value
    this.props.onChange(event); // Propagate change to parent component
  };

  render() {
    const { label, name, data, getItem } = this.props;
    const { choices } = this.state;

    return (
      <FormControl sx={{ minWidth: 1 }}>
        <InputLabel id="simple-select">{label}</InputLabel>
        <Select
          sx={{ minWidth: 1 }}
          className="bg-content"
          labelId="simple-select"
          name={name}
          value={choices}
          onChange={this.handleChange} // Call handleChange on select change
          input={<OutlinedInput label="Tag" />}
          MenuProps={MenuProps}
        >
          {data.map((item) => getItem(item))}
        </Select>
      </FormControl>
    );
  }
}

SelectIndex.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  getItem: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Allow value to be string or number
  onChange: PropTypes.func.isRequired,
};

SelectIndex.defaultProps = {
  getItem: (item) => (
    <MenuItem key={item.id} value={item.id}>
      {item.name}
    </MenuItem>
  ),
};

export default SelectIndex;
