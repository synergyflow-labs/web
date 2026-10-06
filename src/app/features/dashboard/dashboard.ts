import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import { UIChart } from 'primeng/chart';
import { Tag } from 'primeng/tag';

import { KpiCard } from '@shared/components/kpi-card/kpi-card';
import { CHART_COLORS } from '@shared/utils/chart-colors';

import { TRANSLATION_TOKENS } from '@Core/config/language.config';

@Component({
  selector: 'app-dashboard',
  imports: [KpiCard, UIChart, Tag, TranslatePipe],
  template: `
    <div class="dashboard-page">
      <div class="page-header">
        <h1 class="page-title">{{ tokens.DASHBOARD.TITLE | translate }}</h1>
        <p class="page-subtitle">{{ tokens.DASHBOARD.SUBTITLE | translate }}</p>
      </div>

      <section class="kpi-grid" aria-label="KPI Metrics">
        <app-kpi-card
          [title]="tokens.DASHBOARD.TOTAL_USERS | translate"
          value="12,450"
          icon="pi pi-users"
          caption="+14% this month"
          theme="primary"
        />
        <app-kpi-card
          [title]="tokens.DASHBOARD.TOTAL_REVENUE | translate"
          value="$84,200"
          icon="pi pi-dollar"
          caption="+8.2% from target"
          theme="cyan"
        />
        <app-kpi-card
          [title]="tokens.DASHBOARD.ACTIVE_PROJECTS | translate"
          value="24"
          icon="pi pi-briefcase"
          caption="3 pending review"
          theme="violet"
        />
        <app-kpi-card
          [title]="tokens.DASHBOARD.CONVERSION_RATE | translate"
          value="4.6%"
          icon="pi pi-chart-pie"
          caption="+0.8% increase"
          theme="amber"
        />
      </section>

      <section class="charts-grid" aria-label="Analytical Visualizations">
        <div class="chart-card">
          <h2 class="card-heading">{{ tokens.DASHBOARD.MONTHLY_TRENDS | translate }}</h2>
          <p-chart [data]="monthlyData()" [options]="chartOptions()" type="bar" height="280px" />
        </div>

        <div class="chart-card">
          <h2 class="card-heading">{{ tokens.DASHBOARD.CATEGORY_DISTRIBUTION | translate }}</h2>
          <p-chart
            [data]="categoryData()"
            [options]="doughnutOptions()"
            type="doughnut"
            height="280px"
          />
        </div>
      </section>

      <section class="recent-activities-card" aria-label="Recent Activities">
        <h2 class="card-heading">{{ tokens.DASHBOARD.RECENT_ACTIVITIES | translate }}</h2>
        <ul class="activity-list">
          @for (item of activities(); track item.id) {
            <li class="activity-item">
              <div class="activity-info">
                <div class="activity-icon" aria-hidden="true">
                  <i [class]="item.icon"></i>
                </div>
                <div>
                  <p class="activity-name">{{ item.text }}</p>
                  <span class="activity-time">{{ item.time }}</span>
                </div>
              </div>
              <p-tag [value]="item.status" [severity]="item.severity" />
            </li>
          }
        </ul>
      </section>
    </div>
  `,
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  protected readonly tokens = TRANSLATION_TOKENS;

  protected readonly activities = signal([
    {
      id: 1,
      text: 'User John Doe registered a new account',
      time: '12 minutes ago',
      icon: 'pi pi-user-plus',
      status: 'Completed',
      severity: 'success' as const,
    },
    {
      id: 2,
      text: 'Monthly billing cycle processed',
      time: '1 hour ago',
      icon: 'pi pi-credit-card',
      status: 'Processed',
      severity: 'info' as const,
    },
    {
      id: 3,
      text: 'System health check completed with 0 errors',
      time: '3 hours ago',
      icon: 'pi pi-check-circle',
      status: 'Healthy',
      severity: 'success' as const,
    },
    {
      id: 4,
      text: 'Database backup archived to cold storage',
      time: '5 hours ago',
      icon: 'pi pi-database',
      status: 'Archived',
      severity: 'secondary' as const,
    },
  ]);

  protected readonly monthlyData = computed(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue ($k)',
        backgroundColor: CHART_COLORS.primary,
        borderRadius: 6,
        data: [45, 52, 58, 65, 72, 84],
      },
      {
        label: 'Expenses ($k)',
        backgroundColor: CHART_COLORS.cyanLight,
        borderRadius: 6,
        data: [30, 34, 38, 41, 44, 48],
      },
    ],
  }));

  protected readonly categoryData = computed(() => ({
    labels: ['Software', 'Hardware', 'Services', 'Consulting'],
    datasets: [
      {
        data: [42, 28, 18, 12],
        backgroundColor: [
          CHART_COLORS.primary,
          CHART_COLORS.cyan,
          CHART_COLORS.amber,
          CHART_COLORS.violet,
        ],
      },
    ],
  }));

  protected readonly chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 12 },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' } },
    },
  }));

  protected readonly doughnutOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 12 },
      },
    },
  }));
}
