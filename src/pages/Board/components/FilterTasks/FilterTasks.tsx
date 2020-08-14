import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Radio } from 'antd';
import { tasksActionCreator } from '../../../../reducer/tasks/tasks';
import * as tasksSelector from '../../../../reducer/tasks/selectors';
import { IAppState } from '../../../../types';
import { TasksFilter } from '../../../../const';


interface TProps {
  tasksFilter: TasksFilter;
  changeTasksFilter: (tasksFilter: TasksFilter) => void;
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

const mapSteteToProps = (state: IAppState) => ({
  tasksFilter: tasksSelector.getTasksFilter(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeTasksFilter(taskFilter: TasksFilter) {
    dispatch(tasksActionCreator.changeTasksFilter(taskFilter));
  }
})

export default connect(mapSteteToProps, mapDispatchToProps)(FilterTasks);
