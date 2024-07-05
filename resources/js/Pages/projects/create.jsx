import React from 'react';
import { Head, useForm } from '@inertiajs/inertia-react';
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextFieldWithIcon from '@/Components/Inputs/TextFieldWithIcon';
import UserIcon from '@/Components/Icons/UserIcon';
import ProjectsIcon from '@/Components/Icons/ProjectsIcon';
import InputWithIcon from '@/Components/Inputs/InputWithIcon';
import RegionIcon from '@/Components/Icons/RegionIcon';
import UtilizationInput from '@/Components/Inputs/UtilizationInput';
import UtilizationIcon from '@/Components/Icons/UtilizationIcon';

export default function Create(props) {
  const resource = 'project';
  const { data, setData, errors, post } = useForm({
    name: '',
    leader: '',
    region: '',
    leader_utilization: 0,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (data.leader === '' || data.region === '') {
      alert('Please fill in all required fields');
      return;
    }
    post(route(`${resource}s.store`), {
      onSuccess: () => {
        alert('success');
      },
    });
  }

  const updateFormData = (e) => {
    const { name, value } = e.target;
    setData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleRegionChange = (event, value) => {
    setData((currentData) => ({
      ...currentData,
      region: value ? value.name : '',
    }));
  };

  const regions = [
    { id: 1, name: 'Egypt' },
    { id: 2, name: 'SA' },
    { id: 3, name: 'UAE' },
    { id: 4, name: 'Morocco' }, // Added Morocco
  ];

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      title={'Projects'}
      backHref={`/${resource}s`}
    >
      <Head>
        <title>Create a project</title>
      </Head>
      <div id="white container" className="rounded-lg px-32 py-12 bg-white">
        <Typography sx={{ mb: 2 }} variant="h5">
          Create a project
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextFieldWithIcon
            label={'Name'}
            name={'name'}
            icon={<ProjectsIcon svgClassName={'w-6 h-6'} />}
            onChange={updateFormData}
            error={errors.name}
          />
          <InputWithIcon
            input={
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Leader</InputLabel>
                <Select
                  className="bg-content"
                  sx={{ minWidth: 1 }}
                  name={'leader'}
                  label={'leader'}
                  labelId="demo-simple-select-label"
                  required
                  value={data.leader}
                  onChange={updateFormData}
                >
                  {props.leaders.map((i) => (
                    <MenuItem key={i.id} value={i.id}>
                      {i.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            }
            icon={<UserIcon svgClassName={'w-6 h-6'} />}
            error={errors.leader}
          />
          <InputWithIcon
            input={
              <UtilizationInput
                onChange={updateFormData}
                name={'leader_utilization'}
              />
            }
            icon={<UtilizationIcon svgClassName={'w-6 h-6'} />}
            error={errors.leader_utilization}
          />
          <InputWithIcon
            input={
              <Autocomplete
                sx={{ minWidth: 1 }}
                className="bg-content"
                disablePortal
                id="combo-box-regions"
                options={regions}
                getOptionLabel={(i) => i.name}
                name={'region'}
                required
                onChange={handleRegionChange}
                renderInput={(params) => (
                  <TextField {...params} label="Region" />
                )}
              />
            }
            icon={<RegionIcon svgClassName={'w-6 h-6'} />}
            error={errors.region}
          />
          <Button
            type="submit"
            style={{ backgroundColor: 'rgba(75, 0, 130, 0.3)', color: 'black' }}
          >
            Add project
          </Button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
