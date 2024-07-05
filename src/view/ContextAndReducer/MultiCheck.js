import React, { useState, useMemo, useEffect } from 'react';
/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. All the options (including the "Select All") should be split into several columns, and the order is from top to bottom in each column
 */
// export type Props = {
//   // the label text of the whole component
//   label?: string,
//   // Assume no duplicated labels or values
//   // It may contain any values, so be careful for you "Select All" option
//   options: Option[],
//   // Always be non-negative integer.
//   // The default value is 1
//   // 0 is considered as 1
//   // We only check [0, 1, 2, ... 10], but it should work for greater number
//   columns?: number,
//   // Which options should be selected.
//   // - If `undefined`, makes the component in uncontrolled mode with no default options checked, but the component is still workable;
//   // - if not undefined, it's considered as the default value to render the component. And when it changes, it will be considered as the NEW default value to render the component again
//   // - Assume no duplicated values.
//   // - It may contain values not in the options.
//   values?: string[]
//   // if not undefined, when checked options are changed, they should be passed to outside
//   // if undefined, the options can still be selected, but won't notify the outside
//   onChange?: (options: Option[]) => void,
// }

export default function MultiCheck(props) {
  const { label, options, values, columns=1, onChange} = props
  const [checkValues, setCheckValues] = useState(values || [])
  const renderOptions = useMemo(() => {
    // useMemo 是缓存，如果依赖项没有变化，则不会重新计算，可能类似于computed
    const isSelectedAll = options.filter((item) => checkValues.includes(item.value)).length === options.length;
    if(isSelectedAll) {
        checkValues.push('all')
    }
    return [
        {
            label: 'all',
            value: 'all',
        }, 
        ...options
    ]
  }, [options, values])

  // tip do not use too much state and not useEffect
  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    let newValues = [];
    if(value === 'all') {
        const hasAllValue = checkValues.filter((checkValue) => checkValue === 'all')
        if(hasAllValue.length) {
            newValues = []
        } else {
            newValues = [...options.map(op => op.value), 'all']
        }
    } else {
        newValues = checkValues.includes(value) ? checkValues.filter((checkValue) => checkValue !== value) : [...checkValues, value];
        console.log(newValues, '11111')
        const noAllValue = newValues.filter((checkValue) => checkValue!== 'all')
        // this should check all 
        if(noAllValue.length === options.length) {
            newValues.push('all')
        } else {
            // 删除 all
            newValues = noAllValue;
        }
    }
    setCheckValues(newValues);
    if(onChange) {
        onChange(options.filter((item) => newValues?.includes(item.value)));
    }
  }


  useEffect(() => {
    setCheckValues(values || []);
    if(onChange) {
        onChange(options.filter((item) => values?.includes(item.value)));
    }
  }, [values]);

  return <div className='MultiCheck'>
    <div className="multi-check-content">
      {renderOptions.map((option) =>
          <div key={option.value} className="multi-check-item">
            <input
                type='checkbox'
                value={option.value}
                checked={checkValues.includes(option.value)}
                onChange={handleCheckboxChange}
            />
            {option.label}
          </div>
      )}
    </div>
  </div>
}

