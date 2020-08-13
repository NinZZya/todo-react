import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Radio } from 'antd';
import { ActionCreator } from '../../../reducer/tasks/tasks';
import { getTasksFilter } from '../../../reducer/tasks/selectors';
import { TAppState } from '../../../types';
import { TasksFilter } from '../../../const';


interface TProps {
  tasksFilter: string;
  changeTasksFilter: (tasksFilter: string) => void;
};

const FilterTasks = (props: TProps) => {
  const { tasksFilter, changeTasksFilter } = props;

  return (
    <Radio.Group defaultValue={tasksFilter}>
      <Radio.Button value={TasksFilter.ALL} onChange={() => changeTasksFilter(TasksFilter.ALL)}>
        All
      </Radio.Button>
      <Radio.Button value={TasksFilter.ACTIVE} onChange={() => changeTasksFilter(TasksFilter.ACTIVE)}>
        Active
      </Radio.Button>
      <Radio.Button value={TasksFilter.ARCHIVE} onChange={() => changeTasksFilter(TasksFilter.ARCHIVE)}>
        Archive
      </Radio.Button>
    </Radio.Group>
  );
};

export { FilterTasks };

const mapSteteToProps = (state: TAppState) => ({
  tasksFilter: getTasksFilter(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeTasksFilter(taskFilter: string) {
    dispatch(ActionCreator.changeTasksFilter(taskFilter));
  }
})

export default connect(mapSteteToProps, mapDispatchToProps)(FilterTasks);
