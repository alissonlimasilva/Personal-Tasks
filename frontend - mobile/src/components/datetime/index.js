import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Platform, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import getDateHour from '../../utils/dateFormatter';
import Button from '../button';

const DateTime = ({date, onSelected, disabled = false}) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    onSelected(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const viewDatetime = () => {
    const {date: data, hour} = getDateHour(date);
    return (
      <View style={styles.viewDate}>
        <Button
          disabled={disabled}
          style={styles.date}
          text={data}
          onPress={showDatepicker}
        />
        <Button
          disabled={disabled}
          style={styles.hour}
          text={hour}
          onPress={showTimepicker}
        />
      </View>
    );
  };
  return (
    <View>
      {viewDatetime()}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    flex: 1,
    marginRight: 5,
  },
  hour: {
    flex: 1,
    marginLeft: 5,
  },
});

export default DateTime;
