import { useState } from 'react'
import 'css/components/AdminVotesChart.css'
import { LineChart } from '@mui/x-charts/LineChart';

export default function AdminVotesChart(props) {
  const poll = props.poll

  function preparePollSeriesData(poll) {
    // Get the time range from the poll data
    const now = new Date();
    const startDate = new Date(poll.votes[0]?.created_at || now);
    
    // Determine time buckets (e.g., daily buckets over the voting period)
    const days = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24)) || 14;
    const buckets = Math.min(days, 14); // Max 14 data points for readability
    
    // Create time buckets
    const bucketSize = (now - startDate) / buckets;
    const timeBuckets = Array.from({ length: buckets }, (_, i) => {
      return new Date(startDate.getTime() + (i * bucketSize));
    });
    
    // Initialize series for each choice
    const series = poll.choices.map(choice => ({
      label: choice.name,
      curve: "linear",
      data: new Array(buckets).fill(0),
      id: choice.uuid
    }));
    
    // Count cumulative votes in each bucket
    poll.votes.forEach(vote => {
      const voteTime = new Date(vote.created_at);
      const bucketIndex = Math.floor((voteTime - startDate) / bucketSize);
      
      // Find the choice this vote belongs to
      const choiceIndex = poll.choices.findIndex(c => c.uuid === vote.choice_uuid);
      
      if (choiceIndex !== -1 && bucketIndex >= 0 && bucketIndex < buckets) {
        // Increment all buckets from this point forward (cumulative)
        for (let i = bucketIndex; i < buckets; i++) {
          series[choiceIndex].data[i]++;
        }
      }
    });
    
    return {
      series,
      xLabels: timeBuckets.map(date => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
    };
  }

  const chartData = preparePollSeriesData(poll);
  return (
    <div className="admin_votes_chart">
      <LineChart
        series={chartData.series}
        xAxis={[{ scaleType: 'point', data: chartData.xLabels }]}
        height={300}
      />
    </div>
  )
}