import { shallow } from 'enzyme';
import React from 'react';
import TransactionFilterMenu from './TransactionFilterMenu';

jest.mock('@ptomasroos/react-native-multi-slider', () => {
  const MultiSlider = () => true;
  return MultiSlider;
});

jest.mock('@fortawesome/react-native-fontawesome', () => {
  const FontAwesomeIcon = () => true;
  return { FontAwesomeIcon };
});

describe('TransactionSort', () => {
  describe('#render', () => {
    let wrapper;
    let onSelectMock;
    let selectedMinValue;
    let selectedMaxValue;
    let selectedValues;
    let selectedSort;

    beforeEach(() => {
      onSelectMock = jest.fn();

      selectedMinValue = 5000;
      selectedMaxValue = 2023123;
      selectedValues = [selectedMinValue, selectedMaxValue];
      selectedSort = 'lowest-amount';

      wrapper = shallow(<TransactionFilterMenu onSelect={onSelectMock} />);
      wrapper.instance()._instance = {
        close: jest.fn()
      };
    });

    it('should render transaction filter amount, transaction sort, and apply', () => {
      const elementFilter = wrapper.find({
        testID: 'transaction-filter-amount'
      });
      const elementSort = wrapper.find({ testID: 'transaction-sort' });
      const elementApply = wrapper.find({ testID: 'transaction-apply' });

      expect(elementFilter).toHaveLength(1);
      expect(elementSort).toHaveLength(1);
      expect(elementApply).toHaveLength(1);
    });

    it('should change the props of transaction filter amount', () => {
      wrapper
        .find({ testID: 'transaction-filter-amount' })
        .simulate('change', selectedValues);

      expect(
        wrapper.find({ testID: 'transaction-filter-amount' }).props()
          .selectedMinValue
      ).toEqual(selectedMinValue);

      expect(
        wrapper.find({ testID: 'transaction-filter-amount' }).props()
          .selectedMaxValue
      ).toEqual(selectedMaxValue);
    });

    it('should change the props of transaction sort', () => {
      wrapper
        .find({ testID: 'transaction-sort' })
        .simulate('select', selectedSort);

      expect(
        wrapper.find({ testID: 'transaction-sort' }).props().selectedSort
      ).toEqual(selectedSort);
    });

    it('should called onSelect with the selected sort and values when the apply button is invoked', () => {
      wrapper
        .find({ testID: 'transaction-filter-amount' })
        .simulate('change', selectedValues);

      wrapper
        .find({ testID: 'transaction-sort' })
        .simulate('select', selectedSort);

      wrapper.find({ testID: 'transaction-apply' }).simulate('press');

      expect(onSelectMock).toBeCalledWith(selectedValues, selectedSort);
    });
  });
});
