import { shallow } from 'enzyme';
import React from 'react';
import TransactionSort from './TransactionSort';

describe('TransactionSort', () => {
  describe('#render', () => {
    let wrapper;
    let onSelect;
    let selectedSortStyle;
    let oldestSortDate;

    beforeEach(() => {
      onSelect = jest.fn();
      oldestSortDate = 'oldest-date';
      selectedSortStyle = {
        backgroundColor: '#F79C06',
        padding: 5,
        width: '45%',
        borderRadius: 10,
        marginTop: 20
      };

      wrapper = shallow(
        <TransactionSort onSelect={onSelect} selectedSort={oldestSortDate} />
      );
    });

    it('should render Text Sort By and Sort Types', () => {
      expect(wrapper.find({ testID: 'sort-by' })).toHaveLength(1);
      expect(wrapper.find('TouchableOpacity')).toHaveLength(4);
    });

    it('should change the selected sort style into selected sort', async () => {
      const newestDate = 'newest-date';
      wrapper = shallow(
        <TransactionSort onSelect={onSelect} selectedSort={newestDate} />
      );

      expect(wrapper.find({ testID: 'newest-date' }).props().style).toEqual(
        selectedSortStyle
      );
    });

    it('should called onSelect selected sort when the button is invoked', () => {
      wrapper.find({ testID: 'oldest-date' }).simulate('press');

      expect(onSelect).toBeCalledWith(oldestSortDate);
    });
  });
});
