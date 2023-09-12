import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  Text,
  ShellBar,
  ShellBarItem,
  List,
  CustomListItem,
  StandardListItem,
  ValueState,
  ProgressIndicator,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxDirection,
 
} from "@ui5/webcomponents-react";
import { spacing, ThemingParameters } from "@ui5/webcomponents-react-base";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import lineChartIcon from "@ui5/webcomponents-icons/dist/line-chart.js";
import barChartIcon from "@ui5/webcomponents-icons/dist/horizontal-bar-chart.js";
import addIcon from "@ui5/webcomponents-icons/dist/add.js";
import listIcon from "@ui5/webcomponents-icons/dist/list.js";
import imageLegal from "./saplogo.png"


import {
  SideNavigation,
  SideNavigationItem,
  SideNavigationSubItem,
} from "@ui5/webcomponents-react";
import { Calendar, Text as TextUI5, Icon as IconUI5 } from "@ui5/webcomponents-react"; // Renomeie Text para TextUI5 e Icon para IconUI5
import { spacing as ui5Spacing } from "@ui5/webcomponents-react-base";

// Restante do seu código...

export function MyApp() {
  const [toggleCharts, setToggleCharts] = useState("lineChart");
  const [loading, setLoading] = useState(false);
  const handleHeaderClick = () => {
    if (toggleCharts === "lineChart") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setToggleCharts("barChart");
      }, 2000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setToggleCharts("lineChart");
      }, 2000);
    }
  };
  const contentTitle =
    toggleCharts === "lineChart" ? "Line Chart" : "Bar Chart";
  const switchToChart =
    toggleCharts === "lineChart" ? "Bar Chart" : "Line Chart";

  

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    setCalendarVisible(false);
  };

  const showCalendar = () => {
    setCalendarVisible(true);
  };

  const dataset = () => {

  }

  return (
    <div className="centered-container">
      {/* Adicione o ShellBar */}
      <ShellBar
        image = {<img className="imageLegal " src={imageLegal} alt="newsImageImage" /> }
        
        
        profile={
          <Avatar>
            <img src="saplogo.png" alt="Profile" /> {}
          </Avatar>
        }
        primaryTitle= "App about React and SAP"
      >
        {/* Adicione um ShellBarItem personalizado */}
        <ShellBarItem icon={addIcon} text="Add" />
      </ShellBar>
      <Card
        header={
          <CardHeader
            titleText="Progress view"
            subtitleText={`Click here to switch to ${switchToChart}`}
            interactive
            onClick={handleHeaderClick}
            avatar={
              <IconUI5
                name={
                  toggleCharts === "lineChart" ? lineChartIcon : barChartIcon
                }
              />
            }
          />
        }
        style={{ width: "300px" }}
      >
        <TextUI5 style={ui5Spacing.sapUiContentPadding}>{contentTitle}</TextUI5>
        {toggleCharts === "lineChart" ? (
          <LineChart
            dimensions={[{ accessor: "month" }]}
            measures={[{ accessor: "data", label: "Learning Progress" }]}
            dataset={dataset}
            loading={loading}
          />
        ) : (
          <BarChart
            dimensions={[{ accessor: "month" }]}
            measures={[{ accessor: "data", label: "Stock Price" }]}
            dataset={dataset}
            loading={loading}
          />
        )}
      </Card>
      <Card
        header={
          <CardHeader
            titleText="Progress"
            subtitleText="List"
            avatar={<IconUI5 name={listIcon} />}
          />
        }
        style={{ width: "300px" }}
      >
        <List>
          <StandardListItem additionalText="finished" additionalTextState={ValueState.Success}>
            Coding
          </StandardListItem>
          <StandardListItem additionalText="failed" additionalTextState={ValueState.Error}>
            Sleep
          </StandardListItem>
          <CustomListItem>
            <FlexBox direction={FlexBoxDirection.Column} style={{ width: "100%", ...spacing.sapUiContentPadding }}>
              <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                <Text style={{ fontSize: ThemingParameters.sapFontLargeSize }}>
                  Programming
                </Text>
                <Text style={{ color: ThemingParameters.sapCriticalTextColor }}>
                  in progress
                </Text>
              </FlexBox>
              <ProgressIndicator
                value={89}
                valueState={ValueState.Success}
                style={{ ...spacing.sapUiTinyMarginTop }}
              />
            </FlexBox>
          </CustomListItem>
          <CustomListItem>
            <FlexBox direction={FlexBoxDirection.Column} style={{ width: "100%", ...spacing.sapUiContentPadding }}>
              <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                <Text style={{ fontSize: ThemingParameters.sapFontLargeSize }}>
                  Studing
                </Text>
                <Text style={{ color: ThemingParameters.sapCriticalTextColor }}>
                  in progress
                </Text>
              </FlexBox>
              <ProgressIndicator
                value={5}
                valueState={ValueState.Error}
                style={{ ...spacing.sapUiTinyMarginTop }}
              />
            </FlexBox>
          </CustomListItem>
        </List>
      </Card>
      <button onClick={toggleSidebar}>More Information</button>
      {sidebarVisible && (
        <SideNavigation>
          <div slot="header">Welcome</div>
          <SideNavigationItem text="Home" icon="home" />
          <SideNavigationItem text="Sites" icon={listIcon} />
          <SideNavigationItem text="Locations" icon="world">
            <SideNavigationSubItem text="Mülheim an der Ruhr" />
            <SideNavigationSubItem text="Online" />
          </SideNavigationItem>
          <SideNavigationItem
            text="Events"
            icon="calendar"
            onClick={showCalendar}
          />
        </SideNavigation>
      )}
      {calendarVisible && (
        <Calendar
          primaryCalendarType="Gregorian"
          formatPattern="yyyy-MM-dd"
          onSelectedDatesChange={(e) => console.log(e.detail.dates)}
        />
      )}
    </div>
  );
}
