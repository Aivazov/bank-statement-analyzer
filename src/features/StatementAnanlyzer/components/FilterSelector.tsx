import React, { Dispatch, SetStateAction } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FilterSelectorProps = {
  setFilterType: Dispatch<SetStateAction<string>>;
};

const FilterSelector = ({ setFilterType }: FilterSelectorProps) => {
  return (
    <Select defaultValue='all' onValueChange={setFilterType}>
      <SelectTrigger className='w-48 bg-zinc-900 border-zinc-700 text-zinc-200 focus:ring-zinc-700'>
        <SelectValue placeholder='Фільтр' />
      </SelectTrigger>
      <SelectContent className='bg-zinc-900 border-zinc-700 text-zinc-200'>
        <SelectItem value='all'>Усі</SelectItem>
        <SelectItem value='income'>Тільки доходи</SelectItem>
        <SelectItem value='expense'>Тільки витрати</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterSelector;
