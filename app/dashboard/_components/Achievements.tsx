import React from 'react';
import { Icon } from 'lucide-react';

const AchievementsFeed = ({ achievements }) => {
  const getAchievementIcon = (type) => {
    const icons = {
      milestone: 'Trophy',
      improvement: 'TrendingUp',
      streak: 'Zap',
      skill: 'Target',
      session: 'CheckCircle'
    };
    return icons[type] || 'Star';
  };

  const getAchievementColor = (type) => {
    const colors = {
      milestone: 'text-warning bg-warning/10',
      improvement: 'text-success bg-success/10',
      streak: 'text-primary bg-primary/10',
      skill: 'text-accent bg-accent/10',
      session: 'text-success bg-success/10'
    };
    return colors[type] || 'text-primary bg-primary/10';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);


  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Achievements</h3>
          <p className="text-sm text-muted-foreground">Your latest milestones and improvements</p>
        </div>
        
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`p-2 rounded-lg ${getAchievementColor(achievement.type)}`}>
             
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {achievement.title}
                </h4>
                <span className="text-xs text-muted-foreground ml-2">
                  {formatTimeAgo(achievement.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {achievement.description}
              </p>
              
              {achievement.points && (
                <div className="flex items-center space-x-1 mt-2">
                 
                  <span className="text-xs font-medium text-success">
                    +{achievement.points} points
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Points This Week</span>
          <span className="font-semibold text-foreground">+245 points</span>
        </div>
      </div>
    </div>
  );
};
}
export default AchievementsFeed;
