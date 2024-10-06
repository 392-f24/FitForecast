/* eslint-disable react/prop-types */
import clsx from 'clsx'
import { useState } from 'react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const CustomDropdown = ({data}) => {

    const [selected, setSelected] = useState(data[0])

  return (
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 border-gray-300',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
        >
          {selected}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--button-width)] rounded-xl border border-black/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] z-50 focus:outline-none',
            'transition duration-100 ease-in'
          )}
        >
          {data.map((item) => (
            <ListboxOption
              key={item}
              value={item}
              className="group flex cursor-default select-none items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/5 data-[focus]:text-indigo-500"
            >
              <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
              <div className="text-sm/6">{item}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
  )
}

export default CustomDropdown